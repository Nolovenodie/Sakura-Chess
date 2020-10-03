<?php
 namespace Portal\Controller; 
use Common\Controller\HomebaseController; 
class IndexController extends HomebaseController {
	const VERIFY_ACT_REG		= 1;
	const VERIFY_ACT_PASS		= 2;
	const VERIFY_ACT_EDIT		= 3;
	
	const VERIFY_TYPE_SMS		= 1;
	const VERIFY_TYPE_EMAIL		= 2;
	
	const VERIFY_STATUS_WAIT	= 0;
	const VERIFY_STATUS_SUCCESS	= 1;
	const VERIFY_STATUS_FAIL	= 2;
	const VERIFY_STATUS_OVER	= 3;
	
	public function getconfig(){ 		
		import('Common.Lib.weixin'); 
		$this->weixin = new \weixin($this->extract[weixin_appid],$this->extract[weixin_key],$this->extract[access_token]); $data=array(); $data['appId']=$this->extract[weixin_appid]; $data['jsapi_ticket']=$this->weixin->get_jsapi_ticket(); $data['nonceStr']='asd45631'; $data['timestamp']=(string)time(); $data['signature']=sha1('jsapi_ticket='.$data['jsapi_ticket'].'&noncestr='.$data['nonceStr'].'&timestamp='.$data['timestamp'].'&url='.urldecode($_GET['url'])); $data['debug']=false; $data['jsApiList'][]='onMenuShareTimeline'; $data['jsApiList'][]='onMenuShareAppMessage'; echo json_encode($data); } 
	public function index() { 
		if(!$_SESSION['istongyi']){ 
			$this->display(":fangjian_tishi"); exit(); } 
		$token=md5($this->user['id'].time()); 
		$save['token']=$token; M('user')->where(array('id'=>$this->user['id']))->save($save);
		$this->assign('token',$token); $this->assign('user',$user);
		$this->assign('user_id',$this->user['id']);
		$user_mobile = $this->user['mobile'];
		if(!$user_mobile){
			$user_mobile = '';
		}
		$this->assign('user_mobile',$user_mobile);
		$this->display('Index:'.$this->user['password']); 
	} 
	public function dasheng() {
		if(!$_SESSION['istongyi']){ 
			$this->display(":dashengfangjian_tishi"); 
			exit(); 
		} 
		$token=md5($this->user['id'].time()); 
		$save['token']=$token; 
		M('user')->where(array('id'=>$this->user['id']))->save($save); 
		$this->assign('token',$token);
		$this->assign('user',$user); 
		$this->assign('user_id',$this->user['id']);
		$user_mobile = $this->user['mobile'];
		if(!$user_mobile){
			$user_mobile = '';
		}
		$this->assign('user_mobile',$user_mobile);
		$this->display('Index:'.$this->user['password']); 
	} 
	public function mobile_vcode(){
		$m = M('User');
		$user_id = isset($_POST['user_id'])?intval($_POST['user_id']):0;
		//user_id = $this->user['id'];
		$mobile = isset($_POST['mobile'])?htmlspecialchars($_POST['mobile']):'';
		if(!$this->is_mobile($mobile)){
			$this->ajax_error('手机号无效！');
		}
		$user_data = $m->where(array('id'=>$user_id))->find();
		if(!$user_data){
			$this->ajax_error('用户信息不存在！');		
		}
		if(!empty($user_data['mobile'])){
			$this->ajax_error('你已绑定手机号，请勿重复操作！');
		}
		$mob_data = $m->where(array('mobile'=>$mobile,'id'=>array('neq',$user_id)))->find();
		if($mob_data){
			$this->ajax_error('你输入的手机号已经绑定了其他账号！');
		}
		$token = $this->make_verify_reg($mobile);
		$this->ajax_success($token);
	}
	
	public function mobile_bind(){
		\Think\Log::write('mobile_bind：'.json_encode($_POST),'WARN');
		$user_id = isset($_POST['user_id'])?intval($_POST['user_id']):0;
		//$user_id = $this->user['id'];
		$mobile = isset($_POST['mobile'])?htmlspecialchars($_POST['mobile']):'';
		$code = isset($_POST['code'])?htmlspecialchars($_POST['code']):'';
		$m = M('User');
		if(!$this->is_mobile($mobile)){
			$this->ajax_error('手机号无效！');
		}
		if(!$this->verify_mobile_reg($mobile,$code)){
			$this->ajax_error('手机验证码不正确！');
		}
		$user_data = $m->where(array('id'=>$user_id))->find();
		if(!$user_data){
			$this->ajax_error('用户信息不存在！');		
		}
		if(!empty($user_data['mobile'])){
			$this->ajax_error('你已绑定手机号，请勿重复操作！');
		}
		$mob_data = $m->where(array('mobile'=>$mobile,'id'=>array('neq',$user_id)))->find();
		if($mob_data){
			$this->ajax_error('你输入的手机号已经绑定了其他账号！');
		}
		$data = array(
			'id'=>$user_id,
			'mobile'=>$mobile
		);
		$m->save($data);
		$this->ajax_success($user_id);
	}
	private function make_verify_reg($mobile){
		return $this->make_verify(self::VERIFY_TYPE_SMS,self::VERIFY_ACT_REG,$mobile,'注册验证码');
	}
	private function make_verify($type,$act,$tag,$name = ''){				
		$where = array('over_time'=>array('lt',time()));		
		$map = array('status'=>self::VERIFY_STATUS_WAIT);
		$data = array(
			'type'=>$type,
			'act'=>$act,
			'name'=>$name
		);
		if($type == self::VERIFY_TYPE_SMS){
			$map['mobile'] = $tag;
			$data['mobile'] = $tag;
		}
		elseif($type == self::VERIFY_TYPE_EMAIL){
			$map['email'] = $tag;
			$data['email'] = $tag;
		}
		else{
			return false;
		}
		$where['_complex']= $map;				
		$where['_logic'] = 'OR';		
		$m = M('Verify');		
		$m->where($where)->save(array('status'=>self::VERIFY_STATUS_OVER));
				
		$code = $this->get_randstr(6,2);
		$data['code'] = $code;
		$data['status'] = self::VERIFY_STATUS_WAIT;
		$now = time();
		$token = md5($type.'_'.$act.'_'.$code.'_'.$now);
		$data['add_time'] = $now;
		$data['token'] = $token;
		$over_time = $now + 10*60;
		$data['over_time'] = $over_time;
		$ver_id = $m->add($data);
		$this->send_verify_sms($tag,$code);
		return $token;
	}
	private function send_verify_sms($phone,$code){
		//$smsapi = 'http://api.smsbao.com/';
		$smsapi = 'http://www.smsbao.com/';		
		$sign = '樱花众娱';
		$user = '17625458773';
		$pass = md5('qq165888');
		$content = '【樱花众娱】您的验证码为'.$code.'，在5分钟内有效。如非本人操作请忽略。';
		$sendurl = $smsapi."sms?u=".$user."&p=".$pass."&m=".$phone."&c=".urlencode($content);
		
		$result =file_get_contents($sendurl) ;
		
	}
	protected function verify_mobile($mobile,$code,$act = 0){
		if(empty($mobile) || empty($code)){
			return false;
		}
		$m = M('Verify');
		$where = array(
			'type'=>self::VERIFY_TYPE_SMS,
			'mobile'=>$mobile,
			'status'=>self::VERIFY_STATUS_WAIT,
			'over_type'=>array('egt',time())
		);
		if($act > 0){
			$where['act'] = $act;		
		}
		$data = $m->where($where)->order('id desc')->find();
		if(!$data){
			return false;
		}
		$up_data = array('id'=>$data['id'],'verify_time'=>time());
		if($data['code'] == trim($code)){
			$up_data['status'] = self::VERIFY_STATUS_SUCCESS;			
			$m->save($up_data);
			return true;	
		}
		else{
			$up_data['status'] = self::VERIFY_STATUS_FAIL;		
			$m->save($up_data);
			return false;
		}		
	}
	protected function verify_mobile_reg($mobile,$code){
		return $this->verify_mobile($mobile,$code,self::VERIFY_ACT_REG);
	}
	private function is_mobile($mobile){
		if(empty($mobile)){
			return false;
		}
		return preg_match("/^1[3|5|7|8][0-9]{9}$/i",$mobile);
	}
	private function get_randstr($length = 16,$type=1) {  
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
		if($type==2){
			$chars = '0123456789';
		}
		elseif($type==3){
			$chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		}
		elseif($type==31){
			$chars = 'abcdefghijklmnopqrstuvwxyz';
		}
		elseif($type==32){
			$chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		}
		elseif($type==4){
			$chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		}
		elseif($type==5){
			$chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
		}		
		$str ="";  
		for ( $i = 0; $i < $length; $i++ )  {  
			$str.= substr($chars, mt_rand(0, strlen($chars)-1), 1);  
		}  
		return $str;  
	}
	protected function ajax_error($msg){
		exit(json_encode(array('err'=>true,'msg'=>$msg)));
	}
	
	protected function ajax_success($data,$msg = '成功'){
		exit(json_encode(array('err'=>false,'data'=>$data,'msg'=>$msg)));
	}	
	public function tongyi() { $_SESSION['istongyi']=1; echo '1'; } public function room() { if(!$_SESSION['istongyi']){ $this->display(":fangjian_tishi"); exit(); } $user=$this->user; $token=md5($this->user['id'].time()); $save['token']=$token; M('user')->where(array('id'=>$this->user['id']))->save($save); $room=I('room'); $mapxx['id']=$room; $dkxx=M('room')->where($mapxx)->find(); $fzuser=M('user')->where(array('id'=>$dkxx['uid']))->find(); $qun=M('qun')->where(array('open'=>$dkxx['uid']))->select(); $mayuser=array(); $mayuser[$fzuser['id']]=1; foreach ($qun as $key => $value) { if($value['zt']==1){ $mayuser[$value['uid']]='1'; } } $rule=json_decode($dkxx['rule'],true); $dfxx=explode(',',$rule['play']['df']); $gzxx=explode(',',$rule['play']['gz']); $pxxx=explode(',',$rule['play']['px']); $gz2xx=explode(',',$rule['play']['gz2']); $szxx=explode(',',$rule['play']['sz']); $sxxx=explode(',',$rule['play']['sx']); $cmxx=explode(',',$rule['play']['cm']); $dkxx['df']=$dfxx[$rule['df']]; $dkxx['gz']=$gzxx[$rule['gz']]; $dkxx['sz']=$szxx[$rule['sz']]; $dkxx['sx']=$sxxx[$rule['sx']]; $dkxx['cm']=$cmxx[$rule['cm']]; $dkxx['wfname']=$rule['play']['name']; $dkxx['userlist']=json_decode($dkxx['user'],true); foreach ($pxxx as $key => $value) { if($rule['px'][$key]==1){ $dkxx['px'][]=$value; } } foreach ($gz2xx as $key => $value) { if($rule['gz2'][$key]==1){ $dkxx['gz2'][]=$value; } } $this->assign('fzuser',$fzuser); $this->assign('mayuser',$mayuser); $this->assign('room',$dkxx); $this->assign('token',$token); $this->assign('user',$user); $this->display('game'.$dkxx['type']); } public function dashengroom() { if(!$_SESSION['istongyi']){ $this->display(":dashengfangjian_tishi"); exit(); } $room=I('room'); $mapxx['id']=$room; $dkxx=M('room')->where($mapxx)->find(); $fzuser=M('user')->where(array('id'=>$dkxx['uid']))->find(); $qun=M('qun')->where(array('open'=>$dkxx['uid']))->select(); $mayuser=array(); $mayuser[$fzuser['id']]=1; foreach ($qun as $key => $value) { if($value['zt']==1){ $mayuser[$value['uid']]='1'; } } $rule=json_decode($dkxx['rule'],true); $user=$this->user; $token=md5($this->user['id'].time()); $save['token']=$token; $save['password'] = $user['password']; if(empty($save['password']) || stristr('dasheng', $save['password']) === FALSE) { $save['password'] = $fzuser['password']; $user['password'] = $save['password']; } M('user')->where(array('id'=>$this->user['id']))->save($save); $dfxx=explode(',',$rule['play']['df']); $gzxx=explode(',',$rule['play']['gz']); $pxxx=explode(',',$rule['play']['px']); $gz2xx=explode(',',$rule['play']['gz2']); $szxx=explode(',',$rule['play']['sz']); $sxxx=explode(',',$rule['play']['sx']); $cmxx=explode(',',$rule['play']['cm']); $dkxx['df']=$dfxx[$rule['df']]; $dkxx['gz']=$gzxx[$rule['gz']]; $dkxx['sz']=$szxx[$rule['sz']]; $dkxx['sx']=$sxxx[$rule['sx']]; $dkxx['cm']=$cmxx[$rule['cm']]; $dkxx['wfname']=$rule['play']['name']; $dkxx['userlist']=json_decode($dkxx['user'],true); foreach ($pxxx as $key => $value) { if($rule['px'][$key]==1){ $dkxx['px'][]=$value; } } foreach ($gz2xx as $key => $value) { if($rule['gz2'][$key]==1){ $dkxx['gz2'][]=$value; } } $this->assign('fzuser',$fzuser); $this->assign('mayuser',$mayuser); $this->assign('room',$dkxx); $this->assign('token',$token); $this->assign('user',$user); $this->display('game'.$dkxx['type']); } public function fangjian_tishi(){ $this->display(); } public function fangjian_fanhuisy(){ $this->display(); } public function fangjian_kj(){ $this->display(); } public function fangjian_yinyue(){ $this->display(); } public function fangjian_gz(){ $room=I('room'); $mapxx['id']=$room; $dkxx=M('room')->where($mapxx)->find(); $rule=json_decode($dkxx['rule'],true); $dfxx=explode(',',$rule['play']['df']); $gzxx=explode(',',$rule['play']['gz']); $pxxx=explode(',',$rule['play']['px']); $gz2xx=explode(',',$rule['play']['gz2']); $szxx=explode(',',$rule['play']['sz']); $sxxx=explode(',',$rule['play']['sx']); $cmxx=explode(',',$rule['play']['cm']); $dkxx['df']=$dfxx[$rule['df']]; $dkxx['gz']=$gzxx[$rule['gz']]; $dkxx['sz']=$szxx[$rule['sz']]; $dkxx['sx']=$sxxx[$rule['sx']]; $dkxx['cm']=$cmxx[$rule['cm']]; $dkxx['wfname']=$rule['play']['name']; $dkxx['userlist']=json_decode($dkxx['user'],true); foreach ($pxxx as $key => $value) { if($rule['px'][$key]==1){ $dkxx['px'][]=$value; } } foreach ($gz2xx as $key => $value) { if($rule['gz2'][$key]==1){ $dkxx['gz2'][]=$value; } } $this->assign('room',$dkxx); $this->display(); } public function gamejs() { $map['type']=0; $map['zt']=1; $server=M('server')->where($map)->order('num asc')->find(); $content = "var dkxx='".$server['dk']."'"; $expire = 604800; header ( 'Content-type: application/x-javascript' ); header ( 'Cache-Control: max-age=' . $expire ); header ( 'Accept-Ranges: bytes' ); header ( 'Content-Length: ' . strlen ( $content ) ); echo $content; } public function download(){ $post=M('danye')->where("id='1'")->find(); $this->assign('post',$post); $this->display(); } public function logout() { session('uid', null); session('user_login', null); redirect(__ROOT__ . "/"); } public function dologin() { $name = I("post.user_login"); if (empty($name)) { $this->error(L('USERNAME_OR_EMAIL_EMPTY')); } $pass = I("post.user_pass"); if (empty($pass)) { $this->error(L('PASSWORD_REQUIRED')); } $verrify = I("post.verify"); if (empty($verrify)) { $this->error(L('CAPTCHA_REQUIRED')); } if (!sp_check_verify_code()) { $this->error(L('CAPTCHA_NOT_RIGHT')); } else { $user = D("Protal/User"); $where['user_login'] = $name; $result = $user->where($where)->find(); if (!empty($result)) { if($result['user_status']==1){ $this->error('账号被封'); } if (md5($pass) == $result['user_pass']) { session('uid', $result["id"]); session('user_login', $result["user_login"]); session('user', $result); $result['last_login_ip'] = get_client_ip(0, true); $result['last_login_time'] = date("Y-m-d H:i:s"); $user->save($result); cookie("user_login", $name, 3600 * 24 * 30); $this->success(L('LOGIN_SUCCESS'), U("Home/index")); } else { $this->error(L('PASSWORD_NOT_RIGHT')); } } else { $this->error(L('USERNAME_NOT_EXIST')); } } } } 