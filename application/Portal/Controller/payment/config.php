<?php
$config = array (	
		//应用ID,您的APPID。
		'app_id' => "2017021705722270",

		//商户私钥，您的原始格式RSA私钥
		'merchant_private_key' => "MIIEpQIBAAKCAQEA2VZSLVmtw91mY76K47PvKbENVBB5UKUUgtMJhDRVDtiNwtyuUSf8OoheP11EwiRGeBCkQMJDMKQleCdhlpgnp9tmt64mKwnQL0sYBc4zs2qmDDDyn9KnM/N30UcwRSmYYuYLwMzLPbxQmnWxnlZr9eUVX2m/vCSbkF51BpLWQ9mZJXz/tU40SVHPjUwj6c/qkaj5a4IIXj9N1Iwzjzqx8su2B8TB76uwiECT6ygwe+cx0qb20/8dpFmfTKXOUmJW0Gg2Z4tVjcSdNiH1IIn6u8uJ9ioEgVPgMnvucoM018vh0qvzJKBOk8y3fRyBRUAFG9xLTlygEwengjAHzVEa+QIDAQABAoIBAQCkZzbclVTrr8PvOcjIfGkzCXqCl7+dMHL2j3tIZWneRBPgTp0SSQP0pwlcN0p27Yfc9QG69vhqiBDL9kZM66Y7xKzLz1GSBudTjyOJ6LSVSNx4pmIyYeAXXVnKlmY+OzvJvCkx2/j2J0h1vwfwNYGPTY5AUbc3NB31NG6j3Vl1knQsJGb0r6KLC/fo2YI2ydbZqBwxq9+grWLwmmUPIrAbD/Gc95vZpQl32CnJF9qjtCMlBAOnLmKgpgkoRp3CU/W3NtACumT6J4gzC6SLmXT3ZtnknUMqtjjt9pgoAgKdJuXfzNi/rjcTqYbRFLokgN1VPhKA6yCJNQUmInZIXyI9AoGBAPw30u6eDee71wu4I4uJyfya3QBeWfSKoEtuDehjuxO07PlTqFLyg5ezSryTLA8eTQdKmaiqTs5VDLJHimMC6aUOSxMIHZS0G9mbqO7B58vZ7JEOccCphsc1I8qUl4nVdnA/B15+xdVpwkUdJIDWg5iWBfZKkgmyqehxyDJ2HlaLAoGBANyYmgmbno3sjKHcPxa76MFjAvLMjk+HWwNhrcmmzaILKQ67goEGaoOwXZ8yAvAO0rDejTDbU5E4tc+JpQ6yQMY7cSIFru75+OVCOP6l/PoZBGNpyC5nEkUSpITE9m53f/aIdZdwVcMzGFxqNLkGaj8fDZJSEp2/ra/N0beCeYkLAoGBAPN3c89RlTywD4tJik5liSyl1VZIve8YblnB9/zvYKRKT0LypZbEcZDbyvYz3yEM7/Bs691r4Ty9zs69znF7W00wefn6KIvmPMgXwcAQQBCA4iK4XchMHUVpH46rV4j/HSCHRzbJi3FScOzEj/sql8eQclroawafh/JQ+57ydKC3AoGARHbIN/sodnvYGdQ1cGTZlEuaeqip8lzcDmyed1thrs0v7PadRlYrcLuoEuR+rOqs0WABCgzIHuYu5z6dD7abC+se7aQ96sWCTgUDk2UI4sYo6oHGM0CiFvX2QY6vvRExkd5AQMQImhCdmvELc/FdwEFvAN6gEH2Q9mM2l3HTLokCgYEA7cuCNtsAzW46JUjsr6rmQ9brXuwzVDNlU8cGK7qwwqenzoZkcz+2fJQkX1Bo6C712WRAMTVaFPJwTuxN9jHg+B+c/liAmaEIJIm2YCtQSDz5ssmVXo/on15eYut2Qz7I87N6FGc+Ijbxc5iuVb28rfU4kqY9AJ9Y1eb6iXmdJuY=",
		
		//异步通知地址
		'notify_url' => "http://www.bkxing.com/application/Portal/Controller/payment/notify_url.php",
		
		//同步跳转
		'return_url' => "http://www.bkxing.com/application/Portal/Controller/payment/return_url.php",

		//编码格式
		'charset' => "UTF-8",

		//签名方式
		'sign_type'=>"RSA2",

		//支付宝网关
		'gatewayUrl' => "https://openapi.alipay.com/gateway.do",

		//支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
		'alipay_public_key' => "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5qzUxVXqSy+NhQqcYkX5fgIWnWkM0alz1OSMiG+j0bRVKyQi/t2IjIS751wbrzpSrLZUo6WxiC4zJPo3dJLJ0vATe5CfFn+BuI8lcQq9pldf+boMapoYEL3KPI55+CIyNfm1dI5Qnq1efR/ZFBmi8UCZT08206/u8WG1LDOX+oJ8rttlXtIGky1b6AlT8WqvDwZVuObLDOKtinEQriGy43WEB9LeTc263xWZ9ikdOoNsulT0otIzWlz5XIC77SCPra8hu2g5QMyorP9WPxcClRXjWlRzZRg7PT/rhEj26FyNL/7LsyUxd1dCBDUDPZd7C4MM4x44hpKrGPvUUZsGZQIDAQAB",
		
	
);