<?php
/* *
 * 功能：支付宝页面跳转同步通知页面
 * 版本：2.0
 * 修改日期：2016-11-01
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。

 *************************页面功能说明*************************
 * 该页面可在本机电脑测试
 * 可放入HTML等美化页面的代码、商户业务逻辑程序代码
 */
require_once("config.php");
require_once 'wappay/service/AlipayTradeService.php';

error_reporting(E_ERROR | E_WARNING | E_PARSE);

$arr=$_GET;
$alipaySevice = new AlipayTradeService($config); 
$result = $alipaySevice->check($arr);

/* 实际验证过程建议商户添加以下校验。
1、商户需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
3、校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）
4、验证app_id是否为该商户本身。
*/

if($result) {//验证成功
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//请在这里加上商户的业务逻辑程序代码
	
	//——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
    //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表

	//商户订单号
    $host="127.0.0.1";
    $db_user="root";
    $db_pass="tbkMysqlRoot@1234";
    $db_name="bkxing";
    $timezone="Asia/Shanghai";

    $link=mysql_connect($host,$db_user,$db_pass);
    mysql_select_db($db_name,$link);
    mysql_query("SET names UTF8");
    
    header("Content-Type: text/html; charset=utf-8");
    date_default_timezone_set($timezone); //北京时间
    $out_trade_no = htmlspecialchars($_GET['out_trade_no']);
	//支付宝交易号
	$trade_no = htmlspecialchars($_GET['trade_no']);
        $order_query=mysql_query("select * from cmf_order where order_sn=".$out_trade_no);
        $order_info=mysql_fetch_array($order_query,MYSQL_ASSOC); 
//         while ($row=mysql_fetch_array($order_query)) {
//                $order_info[] = $row;
//        }
        if($order_info){
            if($order_info['status']==11){
//           
//            echo '<pre>';print_r($order_info);die();
           
            
                $result=mysql_query("update cmf_order set status=20 where order_sn=".$out_trade_no);//先更新订单状态
                if($result){
                    
                     if($order_info['buyer_name']){      //先检测订单里的用户
                        $buyer_info=mysql_fetch_array(mysql_query("select * from cmf_member where user_login='".$order_info['buyer_name']."'"),MYSQL_ASSOC); //查询用户信息是否存在   
                            if($buyer_info){    
                                $update_buyer=mysql_query("update cmf_member set user_type='2',end_time='".(time()+(365*24*3600))."' where user_login='".$order_info['buyer_name']."'");//修改用户类型和使用截止时间
                                if(!$update_buyer){

                                    echo"update cmf_member set user_type='2',end_time='".(time()+(365*24*3600))."' where user_login='".$order_info['buyer_name']."'";die();
                                }
                            }else{
                                echo '订单用户已经不存在';die();
                            }
                        }
                        if($order_info['up_name']){
                            $up_info=mysql_fetch_array(mysql_query("select * from cmf_member where user_login='".$order_info['up_name']."'"),MYSQL_ASSOC); //查询上级用户信息是否存在
                            if($up_info){    //存在则查看上级的账户信息
                                $upacount_info=mysql_fetch_array(mysql_query("select * from cmf_memberacount where member_name='".$order_info['up_name']."'"),MYSQL_ASSOC);
                                if(!$upacount_info){//如果不存在，则添加
                                    $add_upacount=mysql_query("insert into cmf_memberacount (member_name,member_acount) values ('".$order_info['up_name']."','0')");
                                   }
                                   //更新账户
                                $update_upacount=mysql_query("update cmf_memberacount set member_acount='".($upacount_info['member_acount']+$order_info['up_amount'])."' where member_name='".$order_info['up_name']."'");
                                if(!$update_upacount){

                                    echo"update cmf_memberacount set member_acount='".($upacount_info['member_acount']+$order_info['up_amount'])."'";die();
                                }

                            //日志
                            }

                        }
                        if($order_info['agent_name']){
                            $agent_info=mysql_fetch_array(mysql_query("select * from cmf_member where user_login='".$order_info['agent_name']."'"),MYSQL_ASSOC); //查询上级用户信息是否存在

                            if($agent_info){  

                                $agentacount_info=mysql_fetch_array(mysql_query("select * from cmf_memberacount where member_name='".$order_info['agent_name']."'"),MYSQL_ASSOC);

                                if(!$agentacount_info){//如果不存在，则添加
                                    $add_agentacount=mysql_query("insert into cmf_memberacount (member_name,member_acount) values ('".$order_info['agent_name']."','0')");
                                   }
                               $update_agentacount=mysql_query("update cmf_memberacount set member_acount='".($agentacount_info['member_acount']+$order_info['agent_amount'])."' where member_name='".$order_info['agent_name']."'");
                             }


                        }
                    
                    
                    echo"充值成功，请在APP上进行登陆";die();

                }else{
                    echo"更新失败";die();
                }
            }else{
                echo"已处理订单，请在APP上进行登陆";die();

                }
        }else{
            echo"失败订单，如果已完成支付，请联系客服";die();
        }
//	print_r($_GET);	
	echo "验证成功<br />外部订单号：".$out_trade_no;

	//——请根据您的业务逻辑来编写程序（以上代码仅作参考）——
	mysql_close($link);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
else {
    //验证失败
    echo "验证失败";
}
?>
<title>支付宝手机网站支付接口</title>
	</head>
    <body>
    </body>
</html>