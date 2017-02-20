<?php

namespace Portal\Controller;
use Common\Controller\HomebaseController; 

require dirname ( __FILE__ ).DIRECTORY_SEPARATOR.'payment/wappay/service/AlipayTradeService.php';
require dirname ( __FILE__ ).DIRECTORY_SEPARATOR.'payment/wappay/buildermodel/AlipayTradeWapPayContentBuilder.php';
require dirname ( __FILE__ ).DIRECTORY_SEPARATOR.'payment/config.php';

class Payment{
    
    public function submit_order($member_info,$up_info,$agent_info){
        $order_info=array();
        $order_info['order_amount']=0.01;
        $order_info['up_amount']=180;
        $order_info['agent_amount']=25;
        $order_info['type']=2;//年费会员
        if($member_info){
            $order_info['buyer_id']=$member_info['id'];
            $order_info['buyer_name']=$member_info['user_login'];
        }else{
            echo"生成订单出错，该用户不存在";die();
        }        
        if($up_info){
            $order_info['up_id']=$up_info['id'];
            $order_info['up_name']=$up_info['user_login'];
        }else{
            
        }
        if($agent_info){
            $order_info['agent_id']=$agent_info['id'];
            $order_info['agent_name']=$agent_info['user_login'];
        }else{
            
        }
        $order_info['order_sn']=  $this->_gen_order_sn();
        $order_info['status']=11;
        $order_info['add_time']=time();
         $order_mod=M("order");
         $result=$order_mod->add($order_info);
         if($result){
             $id = $result;
             return $id;
         }else{
             echo"网络故障，支付失败";die();
         }
        
    }
    
    
    private function _gen_order_sn()
    {
        /* 选择一个随机的方案 */
        mt_srand((double) microtime() * 1000000);
        $timestamp = time();
        $y = date('y', $timestamp);
        $z = date('z', $timestamp);
        $order_sn = $y . str_pad($z, 3, '0', STR_PAD_LEFT) . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);

        $model_order =& m('order');
        $orders = $model_order->find('order_sn=' . $order_sn);
        if (empty($orders))
        {
            /* 否则就使用这个订单号 */
            return $order_sn;
        }

        /* 如果有重复的，则重新生成 */
        return $this->_gen_order_sn();
    }
    
    public function pay_go($order_info){
     if (!empty($order_info['order_sn'])&& trim($order_info['order_sn'])!=""){
    //商户订单号，商户网站订单系统中唯一订单号，必填
    $out_trade_no = $order_info['order_sn'];

    //订单名称，必填
    $subject = $order_info['order_sn'];

    //付款金额，必填
    $total_amount = $order_info['order_amount'];

    //商品描述，可空
//    $body = $order_info['WIDbody'];

    //超时时间
    $timeout_express="1m";

    $payRequestBuilder = new AlipayTradeWapPayContentBuilder();
    $payRequestBuilder->setBody($body);
    $payRequestBuilder->setSubject($subject);
    $payRequestBuilder->setOutTradeNo($out_trade_no);
    $payRequestBuilder->setTotalAmount($total_amount);
    $payRequestBuilder->setTimeExpress($timeout_express);
 
$config = array (	
		//应用ID,您的APPID。
		'app_id' => "2017021705722270",

		//商户私钥，您的原始格式RSA私钥
		'merchant_private_key' => "MIIEpQIBAAKCAQEA2VZSLVmtw91mY76K47PvKbENVBB5UKUUgtMJhDRVDtiNwtyuUSf8OoheP11EwiRGeBCkQMJDMKQleCdhlpgnp9tmt64mKwnQL0sYBc4zs2qmDDDyn9KnM/N30UcwRSmYYuYLwMzLPbxQmnWxnlZr9eUVX2m/vCSbkF51BpLWQ9mZJXz/tU40SVHPjUwj6c/qkaj5a4IIXj9N1Iwzjzqx8su2B8TB76uwiECT6ygwe+cx0qb20/8dpFmfTKXOUmJW0Gg2Z4tVjcSdNiH1IIn6u8uJ9ioEgVPgMnvucoM018vh0qvzJKBOk8y3fRyBRUAFG9xLTlygEwengjAHzVEa+QIDAQABAoIBAQCkZzbclVTrr8PvOcjIfGkzCXqCl7+dMHL2j3tIZWneRBPgTp0SSQP0pwlcN0p27Yfc9QG69vhqiBDL9kZM66Y7xKzLz1GSBudTjyOJ6LSVSNx4pmIyYeAXXVnKlmY+OzvJvCkx2/j2J0h1vwfwNYGPTY5AUbc3NB31NG6j3Vl1knQsJGb0r6KLC/fo2YI2ydbZqBwxq9+grWLwmmUPIrAbD/Gc95vZpQl32CnJF9qjtCMlBAOnLmKgpgkoRp3CU/W3NtACumT6J4gzC6SLmXT3ZtnknUMqtjjt9pgoAgKdJuXfzNi/rjcTqYbRFLokgN1VPhKA6yCJNQUmInZIXyI9AoGBAPw30u6eDee71wu4I4uJyfya3QBeWfSKoEtuDehjuxO07PlTqFLyg5ezSryTLA8eTQdKmaiqTs5VDLJHimMC6aUOSxMIHZS0G9mbqO7B58vZ7JEOccCphsc1I8qUl4nVdnA/B15+xdVpwkUdJIDWg5iWBfZKkgmyqehxyDJ2HlaLAoGBANyYmgmbno3sjKHcPxa76MFjAvLMjk+HWwNhrcmmzaILKQ67goEGaoOwXZ8yAvAO0rDejTDbU5E4tc+JpQ6yQMY7cSIFru75+OVCOP6l/PoZBGNpyC5nEkUSpITE9m53f/aIdZdwVcMzGFxqNLkGaj8fDZJSEp2/ra/N0beCeYkLAoGBAPN3c89RlTywD4tJik5liSyl1VZIve8YblnB9/zvYKRKT0LypZbEcZDbyvYz3yEM7/Bs691r4Ty9zs69znF7W00wefn6KIvmPMgXwcAQQBCA4iK4XchMHUVpH46rV4j/HSCHRzbJi3FScOzEj/sql8eQclroawafh/JQ+57ydKC3AoGARHbIN/sodnvYGdQ1cGTZlEuaeqip8lzcDmyed1thrs0v7PadRlYrcLuoEuR+rOqs0WABCgzIHuYu5z6dD7abC+se7aQ96sWCTgUDk2UI4sYo6oHGM0CiFvX2QY6vvRExkd5AQMQImhCdmvELc/FdwEFvAN6gEH2Q9mM2l3HTLokCgYEA7cuCNtsAzW46JUjsr6rmQ9brXuwzVDNlU8cGK7qwwqenzoZkcz+2fJQkX1Bo6C712WRAMTVaFPJwTuxN9jHg+B+c/liAmaEIJIm2YCtQSDz5ssmVXo/on15eYut2Qz7I87N6FGc+Ijbxc5iuVb28rfU4kqY9AJ9Y1eb6iXmdJuY=",
		
		//异步通知地址
		'notify_url' => "http://www.bkxing.com/payment/notify_url.php",
		
		//同步跳转
		'return_url' => "http://www.bkxing.com/payment/return_url.php",

		//编码格式
		'charset' => "UTF-8",

		//签名方式
		'sign_type'=>"RSA2",

		//支付宝网关
		'gatewayUrl' => "https://openapi.alipay.com/gateway.do",

		//支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
		'alipay_public_key' => "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qzUxVXqSy+NhQqcYkX5fgIWnWkM0alz1OSMiG+j0bRVKyQi/t2IjIS751wbrzpSrLZUo6WxiC4zJPo3dJLJ0vATe5CfFn+BuI8lcQq9pldf+boMapoYEL3KPI55+CIyNfm1dI5Qnq1efR/ZFBmi8UCZT08206/u8WG1LDOX+oJ8rttlXtIGky1b6AlT8WqvDwZVuObLDOKtinEQriGy43WEB9LeTc263xWZ9ikdOoNsulT0otIzWlz5XIC77SCPra8hu2g5QMyorP9WPxcClRXjWlRzZRg7PT/rhEj26FyNL/7LsyUxd1dCBDUDPZd7C4MM4x44hpKrGPvUUZsGZQIDAQAB",
		
	
);
    $payResponse = new AlipayTradeService($config);
    $result=$payResponse->wapPay($payRequestBuilder,$config['return_url'],$config['notify_url']);

    return ;
}
    }
//    private function 
}


