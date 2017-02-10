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
//                $array=array(
//                        "busiid"=>"",
//                        "data"=>array(
//                    "auctionId"=>"544366951856",//商品ID("需要")
//                    "title"=>"婴儿背心纯棉宝宝内衣打底男女童春夏秋装新生儿吊带彩棉儿童背心",//标题("需要")
//                    "pictUrl"=>"http://image.taobao.com/bao/uploaded/i7/TB1FMl3PXXXXXaYaFXXYXGcGpXX_M2.SS2",//商品图片链接("需要")
//                    "zkPrice"=>"39.80",//商品价格("需要")
//                    "biz30day"=>"2719",//销量("需要")
//                    "auctionUrl"=>"http://item.taobao.com/item.htm?id=544366951856",//销量("需要")
//                    "couponLeftCount"=>"12535",//剩余优惠券("需要")
//                    "couponTotalCount"=>"20000",//总优惠券("需要")
//                    "couponLink"=>"https://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=2070952103&activityId=33513c734b244ae19a2d02d5e45455b6",//优惠券链接("有则传")
//                    "couponAmount"=>"20",//优惠券金额("需要")
//                    "couponInfo"=>"满39元减20元",//优惠券信息("需要")
//                    "couponEffectiveStartTime"=>"1486512000",//优惠券开始时间("需要")
//                    "couponStartFee"=>"1487030400",//优惠券满使用金额("有则传")
//                    "couponEffectiveEndTime"=>"",//优惠券结束时间("需要")
//                    "taoToken"=>"￥XSUDiFwpIH￥",//淘口令("需要")
//                    "clickUrl"=>"https://uland.taobao.com/coupon/edetail?activityId=33513c734b244ae19a2d02d5e45455b6&itemId=544366951856&pid=mm_54625351_20776494_70386013&dx=1",//长链接("需要")
//                    "type"=>"auction",//推广位类型("有则传")
//                    "shortLinkUrl"=>"https:\\s.click.taobao.com\oc7599x",//短链接("需要")
//                    "out_type"=>"2",//输出佣金类型:1.通用。2。定向。3鹊桥("需要")
//                    "out_rate"=>"3.5",//输出佣金比率("需要")
//                    "out_CommFee"=>"1.39",//输出佣金价格("需要")
//                    "goods_id"=>"46854",//内部商品ID("需要")
//                ),
//                    "token"=>"11f8c356ead0a41c26e36cb04436bde9"
//                         );
//                 print_r(json_encode($array));
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
    
//    private function check_tbuser($app_str){
//        $this->check_token($app_str);
//        if($app_str['data']['tb_user']){
//            
//            $model_member = M('member');
//            $member_info=$model_member->where(array("token"=>$app_str['token']))->find();
//            if($member_info['tb_user']){
//                
//            }else{
//                
//            }
//            
//        }else{
//            
//        }
//        
//        
//    }


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
                    $member_goods=$model_membergoods->where(array("member_id"=>$member_info['id'],"goods_id"=>$v1['goods_id']))->find();
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
                    if(!$model_membergoods->where(array('goods_id'=>$app_str['data']['goods_id'],"member_id"=>$member_info["id"]))->select()){
                                                      // add
                              $insert_data['add_time']=time();
                              if($model_membergoods->add($insert_data)){
                                  $this->output_data("0010","发布成功"); 
                              }else{
                                   $this->output_data("0010","发布失败"); 
                              }
                         }else{
                                   $this->output_data("0010","发布失败,商品库已存在该商品"); 
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


