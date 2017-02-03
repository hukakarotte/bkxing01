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
namespace Api\Controller;

use Common\Controller\AppframeController;
/**
 * 首页
 */
class IndexController extends AppframeController {
	
  
	public function index() {
           
            if($_POST['app_str']){
                $app_str=  json_decode($_POST['app_str'],true);
//                print_r(json_encode(array("data"=>"1","asd"=>array("asd"=>"asd"))));
                
            
                    if($app_str['busiid']=='A0001'){          //登陆
                        $this->login($app_str);
                    }
                    elseif($app_str['busiid']=='A0002'){         //获取用户信息
                        $this->get_member($app_str);
                    }
                    elseif($app_str['busiid']=='A0003'){         //添加绑定淘宝账号
                        $this->add_tbuser($app_str);
                    }
                    elseif($app_str['busiid']=='A0004'){         //获取商品分类
                       
                        $this->get_category($app_str);
                    }
                    elseif($app_str['busiid']=='A0005'){         //获取商品列表
                       
                        $this->get_goodslist($app_str);
                    }
           
            }else{
                $this->output_data("0010","入参格式有误");
            }
            
    	
    }
    public function index1() {
            echo"asd";
    
    }
    
    //登陆
    private function login($app_str){
          
          
        $member_model=M("member");
        if($app_str['data']){
            
            $array['user_login'] = $app_str['data']['user_login'];
            $array['user_pass']	= md5($app_str['data']['user_pass']);
            $member_info = $member_model->where("user_login='".$array['user_login']."' and user_pass='".$array['user_pass']."'")->find();
           
            if(!empty($member_info)) {
            $token = $this->_get_token($member_info['user_login']);
            if($token){
                        $this->output_data("0000","登陆成功",array("token"=>$token));
                   
            } else {
                 $this->output_data("0010",'登录失败,token生成出错');
            }
        } else {
             $this->output_data("0010",'用户名密码错误');
        }
        }else{
            $this->output_data("0010","入参参数无法找到");
        }
      
        
    }
//    获取用户信息
    private  function get_member($app_str){
        
       $this->check_token($app_str);
      
       $model_member = M('member');
       
       $member_info=$model_member->where(array("token"=>$app_str['token']))->find();
       
       if($member_info){
           unset($member_info['user_pass']);
           unset($member_info['token']);
        $this->output_data("0000","获取用户信息成功",$member_info); 
       }else{
            $this->output_data("0011",'token失效');
       }
    }
    
    private function add_tbuser($app_str){
        
        $this->check_token($app_str);
        
        if($app_str['data']['tb_user']){
            
            $model_member = M('member');

             
            $member_info=$model_member->where(array("token"=>$app_str['token']))->find();
                       
            if($member_info["tb_user"]!=$app_str['data']['tb_user'] && $member_info["tb_user"]) {
           
                     $this->output_data("0010",'您的当前账户已与淘宝账号('.$member_info["tb_user"].')进行绑定，请使用账号('.$member_info["tb_user"].')进行登陆');
                
            } else {
                $mb_user_token_info["tb_user"]=$app_str['data']['tb_user'];
                $result = $model_member->where("token='".$app_str['token']."'")->save($mb_user_token_info);
                if($result){
                    $this->output_data("0000",'绑定成功');
                }
                 
            }
        }else{
            $this->output_data("0010","入参参数无法找到");
        }
    }
     private  function get_category($app_str){
        
       $this->check_token($app_str);
      
       $model_category = M('category');
       
       $category_list=$model_category->where("is_show=1")->order("cat_order asc")->select();
       if($category_list){
        $this->output_data("0000","获取分类列表成功",$category_list); 
       }else{
           $this->output_data("0010","没有更多内容了"); 
       }
        
    }
    
     private  function get_goodslist($app_str){
        
       $this->check_token($app_str);
       $pages=$app_str['data']['pages']?intval($app_str['data']['pages']):1;
            
//            $toPage=$_GET['toPage']?intval($_GET['toPage']):1;
       $catIds=$app_str['data']['cat_id']?intval($app_str['data']['cat_id']):1;
       $perPageSize=$app_str['data']['perPageSize']?intval($app_str['data']['perPageSize']):40;
       $order=$app_str['data']['order']?$app_str['data']['order']:"last_update";
       $sort=$app_str['data']['sort']?$app_str['data']['sort']:"desc";
       
       $where=" is_show=1 ";
       
       $limit="".($pages-1)*$perPageSize.",".$perPageSize*$pages;
       $order="".$order." ".$sort;
       
       if($app_str['data']['cat_id']){
           $where.=" and cat_id=".$app_str['data']['cat_id'];
       }
       if($app_str['data']['keywords']){
           $where.=" and title like '%".$app_str['data']['keywords']. "%'";
       }
       
       $model_goods = M('goods');
       
       $goods_list=$model_goods->where($where)->order($order)->limit($limit)->select();
       if($goods_list){
             $this->output_data("0000","获取商品列表成功",$goods_list); 
       }else{
           $this->output_data("0010","没有更多内容了"); 
       }
        
    }
    //检查token
    private function check_token($app_str){
         if($app_str['token']){
              
            $model_member = M('member');
            
            $member_info=$model_member->where(array("token"=>$app_str['token']))->find();
          
            if(!empty($member_info)) {
                if(intval($member_info['end_time'])<time()){
                                $this->output_data("0010",'用户已过期，请续费');
                    }
                if(intval($member_info['user_status'])==0){
                                $this->output_data("0010",'用户已停用，请联系客服');
                    }
                if(intval($member_info['last_login_time'])+3600<time()){
                                $this->output_data("0011",'token失效');
                    }else{
                        $mb_user_token_info['last_login_time']=time();
                        $result = $model_member->where("token='".$app_str['token']."'")->save($mb_user_token_info);//通过token检查的更新最后时间
                    } 
                
            } else {
                 $this->output_data("0011",'token失效');
            }
        }else{
            $this->output_data("0010","入参参数无法找到");
        }
    }
   
    private function _get_token($user_login) {
        $model_member = M('member');

        //重新登录后以前的令牌失效
        //暂时停用
        //$condition = array();
        //$condition['member_id'] = $member_id;
        //$condition['client_type'] = $_POST['client'];
        //$model_mb_user_token->delMbUserToken($condition);

        //生成新的token
        $mb_user_token_info = array();
        $token = md5($member_id . strval(time()) . strval(rand(0,999999)));
        
        $mb_user_token_info['token'] = $token;
        $mb_user_token_info['last_login_time'] = time();
        

        $result = $model_member->where("user_login='$user_login'")->save($mb_user_token_info);

        if($result) {
            return $token;
        } else {
            return null;
        }

    }
}


