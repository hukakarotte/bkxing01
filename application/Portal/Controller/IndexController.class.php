<?php
/*
 *      _______ _     _       _     _____ __  __ ______
 *     |__   __| |   (_)     | |   / ____|  \/  |  ____|
 *        | |  | |__  _ _ __ | | _| |    | \  / | |__
 *        | |  | '_ \| | '_ \| |/ / |    | |\/| |  __|
 *        | |  | | | | | | | |   <| |____| |  | | |
 *        |_|  |_| |_|_|_| |_|_|\_\\_____|_|  |_|_|
 */
/*
 *     _________  ___  ___  ___  ________   ___  __    ________  _____ ______   ________
 *    |\___   ___\\  \|\  \|\  \|\   ___  \|\  \|\  \ |\   ____\|\   _ \  _   \|\  _____\
 *    \|___ \  \_\ \  \\\  \ \  \ \  \\ \  \ \  \/  /|\ \  \___|\ \  \\\__\ \  \ \  \__/
 *         \ \  \ \ \   __  \ \  \ \  \\ \  \ \   ___  \ \  \    \ \  \\|__| \  \ \   __\
 *          \ \  \ \ \  \ \  \ \  \ \  \\ \  \ \  \\ \  \ \  \____\ \  \    \ \  \ \  \_|
 *           \ \__\ \ \__\ \__\ \__\ \__\\ \__\ \__\\ \__\ \_______\ \__\    \ \__\ \__\
 *            \|__|  \|__|\|__|\|__|\|__| \|__|\|__| \|__|\|_______|\|__|     \|__|\|__|
 */
// +----------------------------------------------------------------------
// | ThinkCMF [ WE CAN DO IT MORE SIMPLE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013-2014 http://www.thinkcmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Dean <zxxjjforever@163.com>
// +----------------------------------------------------------------------
namespace Portal\Controller;
use Common\Controller\HomebaseController; 

/**
 * 首页
 */
class IndexController extends HomebaseController {
	
    //首页 小夏是老猫除外最帅的男人了
	public function index() {
          
    	$this->display(":index");
    }
    public function mob_register() {
            $member_mod=M("member");
            $sign=$_GET['sign'];
            $member_info=$member_mod->where("spreading_code='".$sign."'")->find();
            if($member_info){
                $member_info['user_login'] = substr_replace($member_info['user_login'],'****',3,4);
                
                 $this->assign("member_info",$member_info);
            }else{
                echo"非法参数";die();
            }
            
            
           $this->display(":mob_register"); 
    
    }
    public function download(){
            $member_mod=M("member");
            $sign=$_GET['sign'];
            $member_info=$member_mod->where("spreading_code='".$sign."'")->find();
            if($member_info){
                $member_info['user_login'] = substr_replace($member_info['user_login'],'****',3,4);
                
                 $this->assign("member_info",$member_info);
            }else{
                echo"非法参数";die();
            }
            
        $this->display(":download");
    }
    public function payindex(){
         $tel=$_GET['tel'];
          $this->assign("tel",$tel);
        $this->display(":payindex");
    }
    public function member_info(){
        $sign=$_GET['sign'];
        $model_member=M("member");
        $member_info=$model_member->where("token='".$sign."'")->find();
          
            if(!empty($member_info)) {
                if(intval($member_info['end_time'])<time()){
                                $this->output_data("0010",'用户已过期，请续费');
                    }
                if(intval($member_info['user_status'])==0){
                                $this->output_data("0010",'用户已停用，请联系客服');
                    }
                if(intval($member_info['last_login_time'])+3600<time()){
                    echo"dsa";die();
                                header("Location:/index.php?g=Portal&m=index&a=out_time"); 
                    }else{
                        $mb_user_token_info['last_login_time']=time();
                        $result = $model_member->where("token='".$sign."'")->save($mb_user_token_info);//通过token检查的更新最后时间
                    } 
                
            } else {
                echo$sign;die();
                 header("Location:/index.php?g=Portal&m=index&a=out_time"); 
            }
            $invitation_num=M("member")->where("up_level='".$member_info['user_login']."'")->count();//统计邀请人数
            $cashier_num=M("order")->where("up_name='".$member_info['user_login']."' and status=20")->count();//统计邀请人数
            $this->assign("invitation_num",$invitation_num);
            $this->assign("cashier_num",$cashier_num);
            $this->assign("member_info",$member_info);
        $this->display(":member_info");
    }
    
    public function out_time(){
        $this->display(":timeout");
    }
    
    public function payment(){
        if(IS_POST){
            $user_name=$_POST['phoneNum'];
            $member_mod=M("member");
            $member_info=$member_mod->where("user_login='".$user_name."'")->find();
            if($member_info){
                if($member_info['user_type']==2&&$member_info['end_time']>time()){
                    echo"用户已是年费会员";die();
                }else{
                    $up_info=$member_mod->where("user_login='".$member_info['up_level']."'")->find();
                    $agent_info=$member_mod->where("user_login='".$member_info['up_totalagent']."'")->find();
                    $payment_mod=new Payment;
                    $order_id=$payment_mod->submit_order($member_info,$up_info,$agent_info);
                    $order_model=M("order");
                    $order_info  = $order_model->where("order_id='$order_id' AND buyer_name='$user_name'")->find();
                    
                  
                    if(!$order_info){
                        echo"无法找到订单信息";die();
                    }
                    $payment_mod->pay_go($order_info);
                    
                }
                
            }else{
                echo"用户不存在";die();
            }
            
        }else{
            echo '非法入侵';
        }
    }
    
}


