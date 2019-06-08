<?php
namespace Home\Controller;
use Think\Controller;
use Home\Model;

header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST , GET');

class OperationController extends IndexController {

    function index(){

    }

    //提交申请
    function affirm(){

    }

    //取消申请
    function cancel(){

    }

    //用户界面
    function userall(){

    }

    //封号
    function uoff(){}

    //充值界面
    function chongzhi(){
        $where['results']='审核中';
        $page=i('get.page',1);
        $data=M('user_recharge')->where($where)->page($page,15)->order('id desc')->select();

        $count=M('user_recharge')->where($where)->count();
        $count=ceil($count/15);

        $this->assign('count',$count);
        $this->assign('list',$data);
        $this->display();
    }
    function chongzhis(){
        //      去除空的参数
        $_POST = array_filter($_POST,create_function('$v','return !empty($v);'));
//        echo json_encode($_POST);die;
        $type=I('post.type',1);
        //      金额区间
        $min=I('post.min',0);
        $max=I('post.max',999999999999);
        $where['money']= array(array('gt',$min),array('elt',$max)) ;
        //      多选查询条件类
        if (isset($_POST['user_id'])){
            $user_id=explode(',',$_POST['user_id']);
            $where['uid']=array('in',$user_id);
        }
        //      多选查询条件类
        if (isset($_POST['user_account'])){
            $account=explode(',',$_POST['user_account']);
            $where['account']=array('in',$account);
        }
        //  order条件
        $order=I('post.orders','id desc');
        //  $all  总页数
        $count=M('user_recharge')->where($where)->count();
        $all=ceil($count/15);
        //  $page 当前页
        switch ($type){
            case '跳转':$page=I('post.dump');break;
            case '搜 索':$page=1;break;
            case '首页':$page=1;break;
            case '金额':$page=1;break;
            case '时间':$page=1;break;
            case '尾页':$page=$all;break;
            default:$page=$type;break;
        }

        // 当前页数据查询
        $record=M('user_recharge')->where($where)->order("$order")->page($page,15)->select();

        $array=array('allpage'=>$all,'nowpage'=>$page,'list'=>$record);
        echo json_encode($array);
    }
    //提现界面
    function tixian(){
        $page=i('get.page',1);
        $datas=M('user_drawings')->page($page,15)->order('id desc')->select();

        $count=M('user_drawings')->count();
        $count=ceil($count/15);
        $this->assign('count',$count);
        $this->assign('list',$datas);
        $this->display();
    }
    function tixians(){
        //      去除空的参数
        $_POST = array_filter($_POST,create_function('$v','return !empty($v);'));
//        echo json_encode($_POST);

        $type=I('post.type',1);
        //      筛选where条件组
//        $where['results']=array('neq','审核中');
        //      金额区间
        $min=I('post.min',0);
        $max=I('post.max',999999999999);
        $where['money']= array(array('egt',$min),array('elt',$max)) ;
        //      多选查询条件类
        if (isset($_POST['user_id'])){
            $user_id=explode(',',$_POST['user_id']);
            $where['uid']=array('in',$user_id);
        }
        if (isset($_POST['user_account'])){
            $user_account=explode(',',$_POST['user_account']);
            $where['account']=array('in',$user_account);
        }
        //  order条件
        $order=I('post.orders','id desc');
        //  $all  总页数
        $count=M('user_drawings')->where($where)->count();
        $all=ceil($count/15);
        //  $page 当前页
        switch ($type){
            case '跳转':$page=I('post.dump');break;
            case '搜 索':$page=1;break;
            case '首页':$page=1;break;
            case '金额':$page=1;break;
            case '时间':$page=1;break;
            case '尾页':$page=$all;break;
            default:$page=$type;break;
        }

        // 当前页数据查询
        $record=M('user_drawings')->where($where)->order("$order")->page($page,15)->select();


        $array=array('allpage'=>$all,'nowpage'=>$page,'list'=>$record);
        echo json_encode($array);
    }
    function shenhe(){
        $types = I('post.types',1);

        $where['result']='申请中';
        $where['orders']=I('post.orders','*');

        $updata=$types==1?'提现成功':"提现失败";

        $model1 = M('user_drawings');
        $model2 = M('user_property');
        $model3 = M('user_moneylog');
        $model1->startTrans();
        $model2->startTrans();
        $model3->startTrans();

        $result = $model1->where($where)->setField('result',$updata);

        if( $types == 0 && $result == 1){

            $where['result']='提现失败';
            $U = $model1->where($where)->find();
            $Uid = $U['uid'];
            $money = $U['money'];
            $inc_money = $model2->where(array('uid'=>$Uid))->setInc('money',$money);

            if($inc_money){
                //加流水
                $add = array();

                $add['uid'] = $Uid;
                $add['orders'] = $U['orders'];
                $add['types'] = 1;
                $add['money'] = $model2->where(array('uid'=>$Uid))->getField('money');
                $add['change'] = $money;
                $add['time'] = date('Y-m-d H:i:s');

                $results = $model3->add($add);
            }
            if($result && $inc_money && $results){
                $model1->commit();
                $model2->commit();
                $model3->commit();
                $results = 1;
            }else{
                $model1->rollback();
                $model2->rollback();
                $model3->rollback();
            }

        }elseif($types == 1 && $result == 1){
            $model1->commit();
            $model2->commit();
            $model3->commit();
            $results = 1;
        }else{
            $model1->rollback();
            $model2->rollback();
            $model3->rollback();
        }




        echo json_encode(array('result'=>$results));
    }

    //货币购买
    function pay(){
        $page=I('get.page',1);
        $where['uid']=array('gt',0);
        $data=M('user_buy')->where($where)->page($page,15)->order('id desc')->select();
        $count=M('user_buy')->where($where)->count();
        $count=ceil($count/15);

        $this->assign('count',$count);
        $this->assign('list',$data);
        $this->display();
    }
    function pays(){
        //      去除空的参数
        $_POST = array_filter($_POST,create_function('$v','return !empty($v);'));
//        echo json_encode($_POST);die;
        $type=I('post.type',1);
        //      金额区间
        $min=I('post.min',0);
        $max=I('post.max',999999999999);
        $where['money']= array(array('gt',$min),array('elt',$max)) ;
        //      多选查询条件类
        if (isset($_POST['user_id'])){
            $user_id=explode(',',$_POST['user_id']);
            $where['uid']=array('in',$user_id);
        }else{
            $where['uid']=array('gt',0);
        }
        //      多选查询条件类
        if (isset($_POST['user_account'])){
            $account=explode(',',$_POST['user_account']);
            $where['account']=array('in',$account);
        }
        //  order条件
        $order=I('post.orders','id desc');
        //  $all  总页数
        $count=M('user_buy')->where($where)->count();
        $all=ceil($count/15);
        //  $page 当前页
        switch ($type){
            case '跳转':$page=I('post.dump');break;
            case '搜 索':$page=1;break;
            case '首页':$page=1;break;
            case '金额':$page=1;break;
            case '时间':$page=1;break;
            case '尾页':$page=$all;break;
            default:$page=$type;break;
        }

        // 当前页数据查询
        $record=M('user_buy')->where($where)->order("$order")->page($page,15)->select();

        $array=array('allpage'=>$all,'nowpage'=>$page,'list'=>$record);
        echo json_encode($array);
    }

    //流水
    function water(){
        $page=i('get.page',1);
        $data=M('user_moneylog')->page($page,15)->order('id desc')->select();
        $count=M('user_moneylog')->count();
        $count=ceil($count/15);

        $this->assign('count',$count);
        $this->assign('list',$data);
        $this->display();
    }
    function waters(){
        //      去除空的参数
        $_POST = array_filter($_POST,create_function('$v','return !empty($v);'));
//        echo json_encode($_POST);die;
        $type=I('post.type',1);
        //      金额区间
        $min=I('post.min',0);
        $max=I('post.max',999999999999);
        $where['money']= array(array('egt',$min),array('elt',$max)) ;
        //      多选查询条件类
        if (isset($_POST['user_id'])){
            $user_id=explode(',',$_POST['user_id']);
            $where['uid']=array('in',$user_id);
        }
        //      多选查询条件类
        if (isset($_POST['order_id'])){
            $order_id=explode(',',$_POST['order_id']);
            $where['orders']=array('in',$order_id);
        }
        //  order条件
        $order=I('post.orders','id desc');
        //  $all  总页数
        $count=M('user_moneylog')->where($where)->count();
        $all=ceil($count/15);
        //  $page 当前页
        switch ($type){
            case '跳转':$page=I('post.dump');break;
            case '搜 索':$page=1;break;
            case '首页':$page=1;break;
            case '金额':$page=1;break;
            case '时间':$page=1;break;
            case '尾页':$page=$all;break;
            default:$page=$type;break;
        }

        // 当前页数据查询
        $record=M('user_moneylog')->where($where)->order("$order")->page($page,15)->select();

        $array=array('allpage'=>$all,'nowpage'=>$page,'list'=>$record);
        echo json_encode($array);
    }

    //货币管理
    function ope(){
        $data=M('currency')->select();
        $this->assign('list',$data);
        $this->display();
    }

    function upconfig(){

        $where['id']=I('post.id');
        $up=$_POST;
        unset($up['id']);

        $result=M('currency')->where($where)->save($up);

        $array=array(
            'result'=>$result,
            'where'=>$where,
            'up'=>$up
        );
        echo json_encode($array);
    }


    function user(){

            $count = M('users')->count();
            $page=ceil($count/15);

            $Arr_user = M('users as u')->join('user_property as m on u.uid=m.uid ')->order('id desc')->limit(15)->select();


            $this->assign('count',$page);
            $this->assign('list',$Arr_user);
            $this->display();

    }
    function users(){
        //      去除空的参数
        $_POST = array_filter($_POST,create_function('$v','return !empty($v);'));
//        echo json_encode($_POST);die;
        $type=I('post.type',1);
        //      金额区间
        $min=I('post.min',0);
        $max=I('post.max',999999999999);
        $where['money']= array(array('egt',$min),array('elt',$max)) ;
        //      多选查询条件类
        if (isset($_POST['user_id'])){
            $user_id=explode(',',$_POST['user_id']);
            $where['u.uid']=array('in',$user_id);
        }
        //      多选查询条件类
        if (isset($_POST['user_account'])){
            $account=explode(',',$_POST['user_account']);
            $where['u.account']=array('in',$account);
        }
        //  order条件
        $order=I('post.orders','id');
        //  $all  总页数
        $count=M('users as u')->join('user_property as m on u.uid=m.uid ')->where($where)->count();
        $all=ceil($count/15);
        //  $page 当前页
        switch ($type){
            case '跳转':$page=I('post.dump');break;
            case '搜 索':$page=1;break;
            case '首页':$page=1;break;
            case '金额':$page=1;break;
            case '时间':$page=1;break;
            case '尾页':$page=$all;break;
            default:$page=$type;break;
        }

        // 当前页数据查询
        $record = M('users as u')->join('user_property as m on u.uid=m.uid ')->where($where)->order("$order")->page($page,15)->select();


        $array=array(
            'allpage'=>$all,
            'nowpage'=>$page,
            'list'=>$record,
            'where'=>$where,
            'c'=>$count
        );
        echo json_encode($array);
    }
    function close(){
        $states=I('post.states');
        $where['uid']=I('post.uid');
        $result = M('users')->where($where)->setField('states',$states);

        echo json_encode(array('result'=>$result));
    }
}