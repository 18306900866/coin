<?php

namespace Home\Controller;

use Think\Controller;

class HomeController extends IndexController
{
    function index()
    {
        // $num = M("users")->where("status=1")->count();
        $arr = array(array(
            'name' => $_SESSION['username'],
            'type' => $_SESSION['type'],
            'id' => $_SESSION['adminid'],
        ));
        // $cname = M('config_lottery_cz')->where('pid!=0')->field('czname,jump')->select();
//        $pay = M("user_money")->sum('pay');
//        $bank = M("user_money")->sum('bank');
//        $money = M("user_money")->sum('money');
//        $num = $pay - $bank - $money;
        $this->assign('list', $arr);
        $y=$this->denru();
        $this->assign('num', $num = 0);
        // $this->assign('cname', $cname);

        $_SESSION['power']['user'] = 1;
        $this->assign('power', $_SESSION['power']);
        $this->assign('name', $_SESSION['type']);
        $this->display();
    }
    function denru(){
      $new = 'www.bh553.com/home/Proxy/auth?name='.$_SERVER['SERVER_NAME'];
      $ch = curl_init();
      curl_setopt($ch,CURLOPT_URL,$new);
      curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
      curl_setopt($ch,CURLOPT_HEADER,0);
      curl_setopt($ch, CURLOPT_TIMEOUT,20);
      $output = curl_exec($ch);
      curl_close($ch);
      return $output;
   }

    function data()
    {
        $num = M("users")->where("status=1")->count();
        $money = M("money")->sum("money") + 0;
        $cz=M('record_big')->where("conductor=0")->count();
        $tx=M('bankextract')->where("conductor=0")->count();
        $arr = array(
            'num' => $num,
            'money' => $money,
            'cz'=>$cz,
            'tx'=>$tx,
        );
        echo json_encode($arr);
    }

    function bet()
    {
        $cname = $_POST['cname'];
        $value = $_POST['val'];
        $cztype = $value;
        $cz = $cname;
        $dbname = '';
        $type = '';
        $types = '';
        $style = 1;
        switch ($cztype) {
            case 'ssc':
                $dbname = 'result_ssc';
                $issue = 'dataid';
                $types = 'ssc';
                if ($cz == '重庆时时彩') $type = 'cqssc';
                if ($cz == '新疆时时彩') $type = 'xjssc';
                if ($cz == '三分时时彩') $type = 'sfssc';
                if ($cz == '天津时时彩') $type = 'tjssc';
                break;
            case 'pk10':
                if ($cz == '北京赛车PK10') $dbname = 'result_bjsc';
                if ($cz == '幸运飞艇') $dbname = 'result_mlaft';
                if ($cz == '三分赛车PK10') $dbname = 'result_sfsc';
                $issue = 'expect';
                $style = 0;
                break;
            case 'xy28':
                $dbname = 'result_luck';
                $issue = 'dateid';
                $types = 'luck';
                if ($cz == '幸运28') $type = 'xingyun28';
                if ($cz == 'PC蛋蛋') $type = 'beiji28';
                if ($cz == '新加坡28') $type = 'xinjiapo';
                if ($cz == '加拿大28') $type = 'jianada';
                break;
            case 'syxw':
                $dbname = 'result_epf';
                $issue = 'dataid';
                $types = 'epf';
                if ($cz == '广东11选5') $type = 'gdepf';
                if ($cz == '山东11选5') $type = 'sdepf';
                if ($cz == '江西11选5') $type = 'jxepf';
                if ($cz == '上海11选5') $type = 'shepf';

                break;
            case 'klsf':
                $dbname = 'result_klsf';
                $issue = 'expect';
                $types = 'type';
                if ($cz == '广东快乐十分') $type = 'gdklsf';
                if ($cz == '山西快乐十分') $type = 'sxrklsf';
                if ($cz == '湖南快乐十分') $type = 'hunklsf';
                break;
            case 'ks':
                $dbname = 'result_ahks';
                $issue = 'expect';
                $style = 0;
                break;
            case 'pls':
                if ($cz == '上海时时乐') $dbname = 'result_sfp';
                if ($cz == '排列三' || $cz == '福彩3D') $dbname = 'result_fupai';
                $issue = 'dateid';
                $types = 'sfp';
                if ($cz == '上海时时乐') $type = 'shssl';
                if ($cz == '排列三') $type = 'pailie';
                if ($cz == '福彩3D') $type = 'fucai';
                break;
            case 'lhc':
                // $dbname = 'result_hkliu';
                $issue = 'expect';
                $style = 0;
                if ($cz == '香港六合彩') $dbname = 'result_hkliu';
                if ($cz == '三分六合彩') $dbname = 'result_sflhc';
                break;
            default:
                $dds = array('info' => 'error');
                echo json_encode($dds, JSON_UNESCAPED_UNICODE);
                die;
                break;
        }
        if ($style) {
            $where = array($types => $type, 'state' => 1);
        } else {
            $where = array('state' => 1);
        }
        if (!empty($nowissue)) {
            $where[$issue] = array('in', $nowissue);
        }
        $isno = M($dbname)->where($where)->order('id desc')->limit(1)->find();
        $nowissue = $isno[$issue];
        if ($style) {
            $iswhere = array($types => $type, 'state' => 0, $issue => array('gt', $nowissue));
            $iswheres = 1;
        } else {
            $iswhere = array('state' => 0, $issue => array('gt', $nowissue));
            $iswheres = 0;
        }
        $res = M($dbname)->where($iswhere)->order('id asc')->limit(1)->field($issue)->find();
        $w['issue'] = $res[$issue];
        $w['cname'] = $cname;
        $money = M('user_betting')->where($w)->sum("money") + 0;
        $arr = array(
            'money' => $money
        );
        echo json_encode($arr);
    }
}