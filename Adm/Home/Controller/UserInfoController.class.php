<?php
namespace Home\Controller;
use Think\Controller;
use Home\Model;
header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST , GET');

class UserInfoController extends Controller {


//分页方法
    function page($arr){
        // print_r($arr);

        $page = "<div class='left_dibu'>
                <button class='button border-blue'>首页</button> ";
        if($arr['total_page'] <= $arr['num_page']){
            for($i=1;$i<=$arr['total_page'];$i++) {
                $color = 'green';
                if($arr['now_page'] == $i)$color='red';
                $page .= "<button class='button border-".$color."'>".$i."</button> ";
            }
        }else{
            $num_half_page = ceil($arr['num_page']/2); //分页栏数一半向上取整
            if($arr['now_page'] <= $num_half_page){
                for($i=1;$i<=$arr['num_page'];$i++) {
                    $color = 'green';
                    if($arr['now_page'] == $i)$color='red';
                    $page .= "<button class='button border-".$color."'>".$i."</button> ";
                }
            }else{
                $difference_page = $arr['total_page'] - $arr['now_page']; //总页数-当前页数的值
                $num_inthalf_page = ($arr['num_page'] - 1) / 2; //分页栏数的一半向下取整
                if($difference_page >= $num_inthalf_page){
                    $difference_page = $num_inthalf_page;
                }
                // echo $num_inthalf_page;die;
                $start_num_page = $arr['now_page'] + $difference_page - $arr['num_page'] + 1; //分页初始循环值
                // echo $start_num_page;die;

                for($i=1;$i <= $arr['num_page']; $i++){
                    $color = 'green';
                    if($arr['now_page'] == $start_num_page)$color='red';
                    $page .= "<button class='button border-".$color."'>".$start_num_page++."</button> ";
                }

            }

        }
        $page .="<button class='button border-blue'>尾页</button>
            </div>";
        $page .="<div class='right_dibu' style=''>
                <input type='text' placeholder='页' class='pagenum' style='width: 50px;margin-right: 5px;padding: 0 5px;border: 1px solid #1ab394; font-size: 10px; line-height: 34px;height: 34px; display: inline-block;' data-num={$arr['total_page']}>
                <button class='button border-blue'>跳转</button>
                <span class='zongyeshu'>页数:{$arr['now_page']}/总页数:{$arr['total_page']}</span>

            </div>";

        // echo htmlspecialchars($page);
        return $page;
    }

    //用户充值数据
    function sfjl_data(){



        // $power=$_SESSION['power']['user_recharge'];
        // $type=$_SESSION['type'];
        // if($power==1||$type=='超级管理员'){
        // }else{
        //     return;
        // }

        // $postdata = $_POST;
        $postdata = I('post.');
        $page = $postdata['page'];


        unset($postdata['page']);
        $istrue = 0;
        $wheremap = array();
        $worder = '';
        foreach ($postdata as $pkey => $pval) {
            if($pval != ''){
                $istrue = 1;
                if($pkey == 'type')$wheremap[$pkey] = array('in',rtrim($pval, ","));
                if($pkey == 'results')$wheremap[$pkey] = array('in',rtrim($pval, ","));
                if($pkey == 'uid')$wheremap[$pkey] = array('in',rtrim($pval, ","));

                if($pkey == 'name'){
                    $cityarr = explode(',',$pval);
                    foreach ($cityarr as $nkey => $nval) {
                        $wheremap[$pkey][] = array('like',"%{$nval}%");
                    }
                    $wheremap[$pkey][] = 'or';
                }


                if($pkey == 'starttime'){
                    $time = $postdata['starttime'];
                    // $time = strtotime($postdata['starttime']);
                    // $time = date('Y-m-d H:i:s',$time);
                    $wheremap[$pkey] = array('EGT',$time);
                }
                if($pkey == 'endtime'){
                    $time = strtotime($postdata['endtime']);
                    $time = date('Y-m-d H:i:s',$time);
                    $wheremap[$pkey] = array('ELT',$time);
                }

                if($pkey == 'money_start')$wheremap[$pkey] = array('EGT',$pval);
                if($pkey == 'money_end')$wheremap[$pkey] = array('ELT',$pval);

                if($pkey == 'varr')$worder = $postdata['namem']." $pval";
            }
        }

        if(!empty($postdata['starttime']) && !empty($postdata['endtime'])){
            $wheremap['time'] = array('between', "{$postdata['starttime']},{$postdata['endtime']}");
            unset( $wheremap['starttime']);
            unset( $wheremap['endtime']);
        }else{
            if(!empty($postdata['starttime'])){
                $wheremap['time'] = $wheremap['starttime'];
                unset( $wheremap['starttime']);
                unset( $wheremap['endtime']);
            }
            if(!empty($postdata['endtime'])){
                $wheremap['time'] = $wheremap['endtime'];
                unset( $wheremap['starttime']);
                unset( $wheremap['endtime']);
            }
        }

        // echo json_encode($wheremap);die;


         if(!empty($postdata['money_start']) && !empty($postdata['money_end'])){
            $wheremap['money'] = array('between', "{$postdata['money_start']},{$postdata['money_end']}");
            unset( $wheremap['money_start']);
            unset( $wheremap['money_end']);
        }else{
            if(!empty($postdata['money_start'])){
                $wheremap['money'] = $wheremap['money_start'];
                unset( $wheremap['money_start']);
                unset( $wheremap['money_end']);
            }
            if(!empty($postdata['money_end'])){
                $wheremap['money'] = $wheremap['money_end'];
                unset( $wheremap['money_start']);
                unset( $wheremap['money_end']);
            }
        }

        if(!empty($wheremap['name'])){
            $userwhere['name'] = $wheremap['name'];
            // $wheremap['name'] = '';
            $userli = M('users')->where($userwhere)->field('id,name')->select();
            $userarr = '';
            foreach ($userli as $uukey => $uuval) {
                $userarr .= $uuval['id'].',';
            }
            $userarr = rtrim($userarr,',');
            $wheremap['uid'] = array('in',$userarr);
            unset($wheremap['name']);

        }


        if($istrue){
            $where = $wheremap;
        }else{
            $where = array();
        }

        if(!empty($worder)){
            $order = $worder;
        }else{
            $order = 'id desc';
        }



        $vald = I('post.page');


        $show_page = 15;

        if(empty($page)){

            $page = 1;
            $chu = ($page-1)*$show_page;

            $data = M('user_recharge')->where($where)->order($order)->limit($chu,$show_page)->select();
            $Last = M('user_recharge')->where($where)->order($order)->field('id')->find();

        }else{
            $page = $page;//I('get.page');
            $chu = ($page-1)*$show_page;


            $data = M('user_recharge')->where($where)->order($order)->limit($chu,$show_page)->select();
        }

        foreach ($data as $key => $value) {
            $username = M('users')->where(array('uid' => $value['uid']))->field('name')->find();
            $data[$key]['name'] = $username['name'];
        }
        $total_num_page = M('user_recharge')->where($where)->count();
        $where['results'] = '审核通过';
        $moneycount = M('user_recharge')->where($where)->sum('money');
        if(!$moneycount)$moneycount=0;
        // $show_page = 15;
        $num_page = 9;
        $total_page = ceil($total_num_page / $show_page);

        //分页数组
        $pagearr = array(
                'total_num_page' => $total_num_page,     // 总条数
                'show_page' => $show_page,               //单页显示条数
                'num_page' => $num_page,                 //分页栏显示数
                'total_page' => $total_page,            //总页数
                'now_page' => $page                     //当前页
            );
        $pagedata = $this->page($pagearr);

        $info = array(
                'data' => $data,
                'page' => $pagedata,
                'count' => $moneycount
            );



        // echo '<pre />';
        // print_r($info);
        echo json_encode($info,JSON_UNESCAPED_UNICODE);
    }

    function bank_data(){

        // $power=$_SESSION['power']['user_recharge'];
        // $type=$_SESSION['type'];
        // if($power==1||$type=='超级管理员'){
        // }else{
        //     return;
        // }

        // $postdata = $_POST;
        $postdata = I('post.');
        $page = $postdata['page'];
        unset($postdata['page']);

        if($page == '通过'){
            $this->tongguo($postdata);
        }
        if($page == '拒绝'){
            $this->jujue($postdata);
        }
        if($page == '重置'){
            $this->chongzhi($postdata);
        }
        if($page == '修改'){
            $this->xiugai($postdata);
        }

        $vald = I('post.page');

        if(empty($postdata['uid'])){
            $where = array();
        }else{
            $where['uid'] = $postdata['uid'];
        }

        $show_page = 15;

        if(empty($page)){

            $page = 1;
            $chu = ($page-1)*$show_page;

            $data = M('user_authentication')->where($where)->order('result')->limit($chu,$show_page)->select();

        }else{
            $page = $page;
            $chu = ($page-1)*$show_page;


            $data = M('user_authentication')->where($where)->order('result')->limit($chu,$show_page)->select();
        }


        $total_num_page = M('user_authentication')->count();

        // $show_page = 15;
        $num_page = 9;
        $total_page = ceil($total_num_page / $show_page);

        //分页数组
        $pagearr = array(
                'total_num_page' => $total_num_page,     // 总条数
                'show_page' => $show_page,               //单页显示条数
                'num_page' => $num_page,                 //分页栏显示数
                'total_page' => $total_page,            //总页数
                'now_page' => $page                     //当前页
            );
        $pagedata = $this->page($pagearr);

        $info = array(
                'data' => $data,
                'page' => $pagedata,
                'count' => $moneycount
            );



        // echo '<pre />';
        // print_r($info);
        echo json_encode($info,JSON_UNESCAPED_UNICODE);
    }

    function tongguo($postdata){
        $result = M('user_authentication')->where(array('id'=>$postdata['id']))->setField('result', 1);

        $this->show();
    }

    function jujue($postdata){
        $result = M('user_authentication')->where(array('id'=>$postdata['id']))->delete();

        $this->show();
    }

    function chongzhi($postdata){
        $result = M('user_authentication')->where(array('id'=>$postdata['id']))->setField('city', '');
        $result = M('user_authentication')->where(array('id'=>$postdata['id']))->setField('card_code', '');
        $result = M('user_authentication')->where(array('id'=>$postdata['id']))->setField('bank_code', '');

        $this->show();
    }

    function xiugai($postdata){
        $result = M('user_authentication')->where(array('id'=>$postdata['id']))->setField('city', $postdata['city']);
        $result = M('user_authentication')->where(array('id'=>$postdata['id']))->setField('card_code', $postdata['card_code']);
        $result = M('user_authentication')->where(array('id'=>$postdata['id']))->setField('bank_code', $postdata['bank_code']);
        $this->show();
    }

    function show(){
        $show_page = 15;
        $page = 1;
        if(empty($page)){

            $page = 1;
            $chu = ($page-1)*$show_page;

            $data = M('user_authentication')->order('result')->limit($chu,$show_page)->select();

        }else{
            $page = $page;
            $chu = ($page-1)*$show_page;


            $data = M('user_authentication')->order('result')->limit($chu,$show_page)->select();
        }


        $total_num_page = M('user_authentication')->count();

        // $show_page = 15;
        $num_page = 9;
        $total_page = ceil($total_num_page / $show_page);

        //分页数组
        $pagearr = array(
                'total_num_page' => $total_num_page,     // 总条数
                'show_page' => $show_page,               //单页显示条数
                'num_page' => $num_page,                 //分页栏显示数
                'total_page' => $total_page,            //总页数
                'now_page' => $page                     //当前页
            );
        $pagedata = $this->page($pagearr);

        $info = array(
                'data' => $data,
                'page' => $pagedata,
                'count' => $moneycount
            );
        echo json_encode($info,JSON_UNESCAPED_UNICODE);die;
    }


}