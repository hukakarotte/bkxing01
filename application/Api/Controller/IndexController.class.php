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
//                print_r($_POST);
                $app_str=  json_decode($_POST['app_str'],true);

                
            
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
                    elseif($app_str['busiid']=='A0006'){         //商品入库发布
                       
                        $this->add_membergoods($app_str);
                    }
                    elseif($app_str['busiid']=='A0007'){         //入库商品列表
                       
                        $this->get_membergoods($app_str);
                    }
                    elseif($app_str['busiid']=='A0008'){         //转淘口令
                       
                        $this->turn_tao($app_str);
                    }
                    elseif($app_str['busiid']=='A0009'){         //转淘口令
                       
                        $this->turn_short($app_str);
                    }
                    
                    elseif($app_str['busiid']=='A0010'){         //获取商品转换链接
                       
                        $this->turn_result($app_str);
                    }
                    elseif($app_str['busiid']=='A0011'){         //获取手机验证码
                       
                        $this->get_phonecod($app_str);
                    }
                    elseif($app_str['busiid']=='A0012'){         //注册
                       
                        $this->register($app_str);
                    }
                    elseif($app_str['busiid']=='A0013'){         //查券
                       
                        $this->get_coupon($app_str);
                    }
//                    elseif($app_str['busiid']=='A0008'){         //检查淘宝账号
//                       
//                        $this->check_tbuser($app_str);
//                    }
           
            }else{
                $this->output_data("0010","入参格式有误");
            }
            
    	
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
        $this->output_data("0000","获取分类列表成功",array("itemlist"=>$category_list)); 
       }else{
           $this->output_data("0010","没有更多内容了"); 
       }
        
    }
    
     private  function get_goodslist($app_str){
        
       $this->check_token($app_str);
       $pages=$app_str['data']['pages']?intval($app_str['data']['pages']):1;
            
//            $toPage=$_GET['toPage']?intval($_GET['toPage']):1;
//       $catIds=$app_str['data']['cat_id']?intval($app_str['data']['cat_id']):1;
       $perPageSize=$app_str['data']['perPageSize']?intval($app_str['data']['perPageSize']):40;
       switch ($app_str['data']['order'])
            {
                default :
                $order = "last_update";
                    break;
                case '1':
                    $order = "last_update";
                    break;
                case '2':
                    $order = "couponAmount";
                    break;
                case '3':
                    $order = "biz30day";
                    break;
                case '4':
                    $order = "out_rate";
                    break;
                case '5':
                    $order = "out_CommFee";
                    break;
            }
       
       $sort=$app_str['data']['sort']?$app_str['data']['sort']:"desc";
       
       $where=" is_show=1 ";
       
       $limit="".($pages-1)*$perPageSize.",".$perPageSize*$pages;
       $order="".$order." ".$sort;
       
       if($app_str['data']['cat_id']){
           $where.=" and cat_id=".intval($app_str['data']['cat_id']);
       }
       if($app_str['data']['keywords']){
           $where.=" and title like '%".$app_str['data']['keywords']. "%'";
       }
       
       $model_goods = M('goods');
       $model_membergoods = M('membergoods');
       $model_member = M('member');
       $member_info=$model_member->where(array("token"=>$app_str['token']))->find();
//       print_r($member_info);die();
//       $goods_list=$model_goods->alias("a")->join("cmf_membergoods b on b.auctionId =a.auctionId","LEFT")->field('a.*,b.item_id')->where($where)->order($order)->limit($limit)->select();
       $goods_count=$model_goods->where($where)->count();
       $app_str['data']['goods_count']=$goods_count;
       $app_str['data']['goods_page']=intval($goods_count/$perPageSize);
       $goods_list=$model_goods->where($where)->order($order)->limit($limit)->select();
       
       if($goods_list){
            foreach ($goods_list as $k1=>$v1){
                    $member_goods=$model_membergoods->where(array("member_id"=>$member_info['id'],"auctionId"=>$v1['auctionId']))->find();
                    if($member_goods){
                        $goods_list[$k1]['member_goods']['item_id']=$member_goods['item_id'];
                    }
                    unset($member_goods);
            }
       }
       if($goods_list){
             $this->output_data("0000","获取商品列表成功",array("itemlist"=>$goods_list,"app_str"=>$app_str['data'],)); 
       }else{
           $this->output_data("0010","没有更多内容了"); 
       }
        
    }
    
    private function add_membergoods($app_str){
//        print_r("asd");
        $this->check_token($app_str);
        
        $model_membergoods = M('membergoods');
        $model_member = M('member');
        $member_info=$model_member->where(array("token"=>$app_str['token']))->find();
        
        $insert_data=array(
            "auctionId"=>$app_str['data']['auctionId'],//商品ID
            "title"=>$app_str['data']['title'],//标题
            "pictUrl"=>$app_str['data']['pictUrl'],//商品图片链接
            "zkPrice"=>$app_str['data']['zkPrice'],//商品价格
            "biz30day"=>$app_str['data']['biz30day'],//销量
            "auctionUrl"=>$app_str['data']['auctionUrl'],//商品链接
            "sellerId"=>$app_str['data']['sellerId'],//商品链接
            "couponLeftCount"=>$app_str['data']['couponLeftCount'],//剩余优惠券
            "couponTotalCount"=>$app_str['data']['couponTotalCount'],//总优惠券
            "couponLink"=>$app_str['data']['couponLink'],//优惠券链接
            "couponLinkTaoToken"=>$app_str['data']['couponLinkTaoToken'],//优惠券淘口令
            "couponAmount"=>$app_str['data']['couponAmount'],//优惠券金额
            "couponInfo"=>$app_str['data']['couponInfo'],//优惠券信息
            "couponEffectiveStartTime"=>$app_str['data']['couponEffectiveStartTime'],//优惠券开始时间
            "couponStartFee"=>$app_str['data']['couponStartFee'],//优惠券满使用金额
            "couponEffectiveEndTime"=>$app_str['data']['couponEffectiveEndTime'],//优惠券结束时间
            "taoToken"=>$app_str['data']['taoToken'],//淘口令
            "couponShortLinkUrl"=>$app_str['data']['couponShortLinkUrl'],//优惠券短链接
            "clickUrl"=>$app_str['data']['clickUrl'],//长链接
            "type"=>$app_str['data']['type'],//推广位类型
            "shortLinkUrl"=>$app_str['data']['shortLinkUrl'],//短链接
            "out_type"=>$app_str['data']['out_type'],//输出佣金类型:1.通用。2。定向。3鹊桥
            "out_rate"=>$app_str['data']['out_rate'],//输出佣金比率
            "out_CommFee"=>$app_str['data']['out_CommFee'],//输出佣金价格
            "goods_id"=>$app_str['data']['goods_id'],//内部商品ID
            "is_ground"=>1,//上架
            "is_begin"=>1,//正在进行
            "member_id"=>$member_info["id"],//用户ID
            "last_update"=>time(),//用户ID
        );
                    if(!$model_membergoods->where(array('auctionId'=>$app_str['data']['auctionId'],"member_id"=>$member_info["id"]))->select()){
                                                      // add
                              $insert_data['add_time']=time();
                              if($model_membergoods->add($insert_data)){
                                  $this->output_data("0000","发布成功"); 
                              }else{
                                   $this->output_data("0010","发布失败"); 
                              }
                         }else{
                             
                          $updategoods=$model_membergoods->where("auctionId=".$app_str['data']['auctionId']." and member_id=".$member_info["id"])->save($insert_data);
                          if($updategoods){
                              $this->output_data("0000","发布成功"); 
                          }else{
                                   $this->output_data("0010","发布失败,入库失败"); 
                          }
                              }
       
        
    }
    
    
    private function get_membergoods($app_str){
        $this->check_token($app_str);
       $model_member = M('member');
       $member_info=$model_member->where(array("token"=>$app_str['token']))->find();
        $pages=$app_str['data']['pages']?intval($app_str['data']['pages']):1;
       $perPageSize=$app_str['data']['perPageSize']?intval($app_str['data']['perPageSize']):40;
       switch ($app_str['data']['order'])
            {
                default :
                $order = "last_update";
                    break;
                case '1':
                    $order = "last_update";
                    break;
                case '2':
                    $order = "couponAmount";
                    break;
                case '3':
                    $order = "biz30day";
                    break;
                case '4':
                    $order = "out_rate";
                    break;
                case '5':
                    $order = "out_CommFee";
                    break;
            }
       
       $sort=$app_str['data']['sort']?$app_str['data']['sort']:"desc";
       
       $where=" member_id=".$member_info['id'];
       
       $limit="".($pages-1)*$perPageSize.",".$perPageSize*$pages;
       $order="".$order." ".$sort;
       
       if($app_str['data']['cat_id']){
           $where.=" and cat_id=".intval($app_str['data']['cat_id']);
       }
       switch ($app_str['data']['is_ground']){
                 case '1':
                    $where.= " and is_ground=1 ";
                    break;
                case '0':
                    $where.= " and is_ground=0 ";
                    break;
       }
       
      
       $model_membergoods = M('membergoods');
       $goods_count=$model_membergoods->where($where)->count();
       $app_str['data']['membergoods_count']=$goods_count;
       $app_str['data']['membergoods_page']=intval($goods_count/$perPageSize);
       $goods_list=$model_membergoods->where($where)->order($order)->limit($limit)->select();
 
       if($goods_list){
             $this->output_data("0000","获取商品列表成功",array("itemlist"=>$goods_list,"app_str"=>$app_str['data'],)); 
       }else{
           $this->output_data("0010","没有更多内容了"); 
       }
        
    }
    
    private function turn_result($app_str){
        
        $this->check_token($app_str);
        $pid=$app_str['data']['pid'];
        $goods_id=$app_str['data']['goods_id'];
        print_r($goods_id);
        $model_goods = M('goods');
        if($goods_id){
            $where=" goods_id=".$goods_id;
            $goods_info=$model_goods->where($where)->find();
        }
        if($goods_info['add_way']!=1){
            $str="https://uland.taobao.com/coupon/edetail?";
            if($goods_info['couponactivityid']){
                $str.="activityId=".$goods_info['couponactivityid'];
            }else{
                $this->output_data("0010","获取商品优惠券失败");
            }
            if($goods_info['auctionid']){
                $str.="&itemId=".$goods_info['auctionid'];
            }else{
                $this->output_data("0010","获取商品ID失败");
            }
            if($pid){
                $str.="&pid=".$pid;
            }else{
                $this->output_data("0010","获取用户PID失败");
            }
            if($goods_info['out_type']!=3){
                $str.="&dx=1";
            }
        }else{
            $this->output_data("0010","商品错误");
        }
        $out_token=$this->turn_tao_str(array("data"=>array("title"=>$goods_info["title"],"url"=>$str)));
        $out_short=$this->turn_short_str(array("data"=>array("url"=>$str)));
        $this->output_data("0000","转链成功",array("shortLinkUrl"=>$out_short,"taoToken"=>$out_token,"clickUrl"=>$str));
       
    }
    private function turn_tao_str($app_str){
        //内部调用接口
        $c = new TopClient;
        $c->appkey = "23628252";
        $c->secretKey = "7ff9a9c924e8178c149cc47c2de0b810";
        $req = new WirelessShareTpwdCreateRequest;
        $tpwd_param = new IsvTpwdInfo;
//        $tpwd_param->logo="http://m.taobao.com/xxx.jpg";
        $tpwd_param->text=$app_str['data']['title'];
        $tpwd_param->url=$app_str['data']['url'];
-       $tpwd_param->user_id="4155795";
        $req->setTpwdParam(json_encode($tpwd_param));
        $resp = $c->execute($req);
//        print_r($resp);
        if($resp->model){
        $taokouling=$resp->model;
        $taokouling = (array)$taokouling;
        foreach ($taokouling as $k=>$v){
            $arr=$v;
        }
        return $arr;
        }
    }
    
    private function turn_short_str($app_str){
       
        $c = new TopClient;
        $c->appkey = "23628252";
        $c->secretKey = "7ff9a9c924e8178c149cc47c2de0b810";
        $req = new TbkSpreadGetRequest;
        $requests = new TbkSpreadRequest;
       
        $requests->url=$app_str['data']['url'];
        $req->setRequests(json_encode($requests));
        $resp = $c->execute($req);
//        print_r($resp->results->tbk_spread->content);
//        print_r($resp);
        if($resp->results->tbk_spread->err_msg=="OK"){
        $taokouling=$resp->results->tbk_spread->content;
        $taokouling = (array)$taokouling;
        foreach ($taokouling as $k=>$v){
            $arr=$v;
        }
          return $arr;
        }
    }
    
    private function turn_tao($app_str){
        $this->check_token($app_str);
        $c = new TopClient;
        $c->appkey = "23628252";
        $c->secretKey = "7ff9a9c924e8178c149cc47c2de0b810";
        $req = new WirelessShareTpwdCreateRequest;
        $tpwd_param = new IsvTpwdInfo;
//        $tpwd_param->logo="http://m.taobao.com/xxx.jpg";
        $tpwd_param->text=$app_str['data']['title'];
        $tpwd_param->url=$app_str['data']['url'];
-       $tpwd_param->user_id="4155795";
        $req->setTpwdParam(json_encode($tpwd_param));
        $resp = $c->execute($req);
//        print_r($resp);
        if($resp->model){
        $taokouling=$resp->model;
        $taokouling = (array)$taokouling;
        foreach ($taokouling as $k=>$v){
            $arr=$v;
        }
         $this->output_data("0000","获取淘口令成功",array("taokouling"=>$arr));
        }else{
          $this->output_data("0010",$resp->sub_msg);  
        }
    }
    
    private function turn_short($app_str){
        $this->check_token($app_str);
        $c = new TopClient;
        $c->appkey = "23628252";
        $c->secretKey = "7ff9a9c924e8178c149cc47c2de0b810";
        $req = new TbkSpreadGetRequest;
        $requests = new TbkSpreadRequest;
        $requests->url=$app_str['data']['url'];
        $req->setRequests(json_encode($requests));
        $resp = $c->execute($req);
//        print_r($resp->results->tbk_spread->content);
//        print_r($resp);
        if($resp->results->tbk_spread->err_msg=="OK"){
        $taokouling=$resp->results->tbk_spread->content;
        $taokouling = (array)$taokouling;
        foreach ($taokouling as $k=>$v){
            $arr=$v;
        }
         $this->output_data("0000","获取短链接成功",array("taoshort"=>$arr));
        }else{
          $this->output_data("0010","无效的链接");  
        }
    }
    
    private function register($app_str){
        $phonecod_mod=M("phonecod");
        $member_mod=M("member");
        $code=$app_str['data']['code'];
        $phonenumber=$app_str['data']['phone'];
        $pass=$app_str['data']['pass'];
        $up=$app_str['data']['up'];
        $time=time()-1800;//30分钟时效
        $up_info=$member_mod->where("spreading_code='$up'")->find();
        if($up_info){
                $up_level=$up_info['user_login'];
            if($up_info['id_totalagent']==1){
               $up_totalagent=$up_info['user_login'];
            }else{
                 $up_totalagent=$up_info['up_totalagent'];
            }
        }else{
            $up_level="test";
            $up_totalagent="test";
        }
        
        $this->get_pwd_strength($pass);
        if(!$phonenumber){
            $this->output_data("0010","请输入手机号");
        }
        if(!preg_match("/^1[34578]{1}\d{9}$/",$phonenumber)){  
           $this->output_data("0010","手机号格式不正确");
        }
        if($member_mod->where("user_login='$phonenumber'")->find()){
            $this->output_data("0010","用户已存在");
        }
       
        if($phonecod_mod->where("phone='$phonenumber' and code='$code' and update_time>$time and type=1")->find()){
            $data=array(
                "user_login"=>$phonenumber,
                "user_pass"=>md5($pass),
                "end_time"=>time()+3600*24*3,//3天的试用期
                "creat_time"=>time(),
                "user_status"=>1,
                "up_level"=>$up_level,//上级
                "up_totalagent"=>$up_totalagent,//上级总代
                "spreading_code"=> md5($phonenumber . strval(time()) . strval(rand(0,999999)))
            );
            if($member_mod->add($data)){
                $this->output_data("0000","注册成功");
            }else{
                $this->output_data("0010","注册失败，通讯故障");
            }
            
        }else{
            $this->output_data("0010","请输入正确的手机验证码，或者验证码已经失效");
        }
        
        
    }
    private function get_pwd_strength($pwd){  
        if (strlen($pwd)>30 || strlen($pwd)<6)  
        {  
            $this->output_data("0010","密码必须为6-30位的字符串");
            return "密码必须为6-30位的字符串";  
        }  

//        if(preg_match("/^\d*$/",$pwd))  
//        {  
//            $this->output_data("0010","密码必须包含字母");
//            return "密码必须包含字母,强度:弱";//全数字  
//        }  
//
//        if(preg_match("/^[a-z]*$/i",$pwd))  
//        {  
//            $this->output_data("0010","密码必须包含数字");
//            return "密码必须包含数字,强度:中";//全字母      
//        }  
//
//        if(!preg_match("/^[a-z\d]*$/i",$pwd))  
//        {  
//            $this->output_data("0010","密码只能包含数字和字母");
//            return "密码只能包含数字和字母,强度:强";//有数字有字母  ";  
//        }  
  
    }  
    
    private function get_phonecod($app_str){
        
        $phonecod_mod=M("phonecod");
        $phone=$app_str['data']['phone'];
       
        if($phone==""){
            $this->output_data("0010","手机号不能为空");
        }
        
        $cod=$this->generate_code();
        $content="【橙可优品】验证码".$cod."。请在30分钟内完成注册，如非本人操作，请忽略 。";
        
        $array=$this->send_sms($phone, $content);
        $phone_mod=M("phonecod");
        
        if($array["code"]==0){
            $data_array=array(
                "phone"=>$phone,
                "code"=>$cod,
                "type"=>"1",
                "update_time"=>time()
            );
            if($phone_mod->where("phone=".$phone)->find()){
                
                $updat=$phone_mod->where("phone=".$phone)->save($data_array);
                if($updat){
                    $this->output_data("0000","通讯成功"); 
                }else{
                    $this->output_data("0010","通讯更新失败");
                }
                
            }else{
                $insert_da=$phone_mod->add($data_array);
                if($insert_da){
                      $this->output_data("0000","通讯成功"); 
                }else{
                    $this->output_data("0010","通讯更新失败");
                }
            }
        }else{
            $this->output_data("0010","通讯失败",$array);
        }
    }
    
   private function generate_code($length = 6) {
       
    return rand(pow(10,($length-1)), pow(10,$length)-1);
}

    private function send_sms($moblie,$content){
        header("Content-Type:text/html;charset=utf-8");
        $apikey = "2b217e1b004a52f713889742d6a8cf49"; //修改为您的apikey(https://www.yunpian.com)登录官网后获取
        $mobile = $moblie; //请用自己的手机号代替
        $text=$content;
//        print_r($text);
        $ch = curl_init();

        /* 设置验证方式 */

        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept:text/plain;charset=utf-8', 'Content-Type:application/x-www-form-urlencoded','charset=utf-8'));

        /* 设置返回结果为流 */
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        /* 设置超时时间*/
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);

        /* 设置通信方式 */
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      
        // 发送短信
        $data=array('text'=>$text,'apikey'=>$apikey,'mobile'=>$mobile);
        $json_data = $this->send($ch,$data);
        $array = json_decode($json_data,true);
        
//        echo '<pre>';print_r($array); 
       
        curl_close($ch);
        return $array;
    }
    private function send($ch,$data){
        curl_setopt ($ch, CURLOPT_URL, 'https://sms.yunpian.com/v2/sms/single_send.json');
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        return curl_exec($ch);
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
    private function get_coupon($app_str){
        $this->check_token($app_str);
        
        $sellerId=$app_str['data']['sellerId'];
        $auctionId=$app_str['data']['auctionId'];
       
        $get_coupon=file_get_contents("http://zhushou3.taokezhushou.com/api/v1/coupons_base/".$sellerId."?item_id=".$auctionId);
        $get_coupon_list=json_decode($get_coupon,true);
        $out_list=array();
       
        if($get_coupon_list['data']){
            foreach ($get_coupon_list['data'] as $k=>$v){
                $cateUrl='http://shop.m.taobao.com/shop/coupon.htm?seller_id='.$sellerId.'&activity_id='.$v["activity_id"];
                $cateCon=$this->curl_get_file_contents($cateUrl);
                preg_match('(<div class="coupon-info">.*?<.*?div>)ims',$cateCon,$arr1);
                $arr2=strip_tags($cateCon);
                $out_list[$k]['couponAmount']=$this->getNeedBetween($arr1[0],'<dt>','元优惠券</dt>');
                $out_list[$k]['couponTotalCount']=$this->getNeedBetween($arr1[0],'"rest">','</span>')+$this->getNeedBetween($arr1[0],'"count">','</span>');
                $out_list[$k]['couponLeftCount']=$this->getNeedBetween($arr1[0],'"rest">','</span>');
                $out_list[$k]['couponEffectiveStartTime']=strtotime($this->getNeedBetween($arr1[0],'有效期:','至'));
                $out_list[$k]['couponEffectiveEndTime']=strtotime($this->getNeedBetween($arr1[0],'至','</dd>'));
                $out_list[$k]['couponInfo']=$this->trimall($this->getNeedBetween($arr2,'张）','有效期'));
                $out_list[$k]['couponActivityId']=$v['activity_id'];
                unset($arr1);
                unset($arr2);
                unset($cateCon);
            }
             $this->output_data("0000","获取优惠券列表成功",array("itemlist"=>$out_list));
//            print_r($out_list);
        }else{
            $this->output_data("0010","目前没有多余优惠券");
        }
        
        
       
        
    }
 private   function trimall($str)//删除空格
{
    $qian=array(" ","　","\t","\n","\r");$hou=array("","","","","");
    return str_replace($qian,$hou,$str);    
}
    private function getNeedBetween($str, $leftStr, $rightStr){//字符串截取函数
        
          $left = strpos($str, $leftStr);
        //echo '左边:'.$left;
        $right = strpos($str, $rightStr,$left);
        //echo '<br>右边:'.$right;
        if($left < 0 or $right < $left) return '';
        return substr($str, $left + strlen($leftStr), $right-$left-strlen($leftStr));
        }
   
    private function curl_get_file_contents($URL) 
    { 
    $c = curl_init(); 
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1); 
    //curl_setopt($c, CURLOPT_HEADER, 1);//输出远程服务器的header信息 
    curl_setopt($c, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13'); 
    curl_setopt($c, CURLOPT_URL, $URL); 
    $contents = curl_exec($c); 
    curl_close($c); 
    if ($contents) {return $contents;} 
    else {return FALSE;} 
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
    public function checkcode(){
        if(IS_POST){
			if(!sp_check_verify_code()){
				$this->output_data("0010","请输入正确的验证码");
			}else{
				
				$this->output_data("0000","验证码正确");
			}
			
		}
    
    }
}


