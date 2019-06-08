<?php
namespace Home\Controller;
use Think\Controller;
use Home\Model;
header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST , GET');

class UpimgController extends Controller {

    function upimg(){
        // print_r($_POST);
        // print_r($_FILES);die;

            if($_FILES["file"]["error"])
            {
                echo $_FILES["file"]["error"];
            }
            else
            {
                //没有出错
                //加限制条件
                //判断上传文件类型为png或jpg且大小不超过1024000B
                if(($_FILES["file"]["type"]=="image/png"||$_FILES["file"]["type"]=="image/jpeg")&&$_FILES["file"]["size"]<1024000)
                {
                        //防止文件名重复
                        $filename ="./Upload/".time().$_FILES["file"]["name"];
                        $filesn = "/Upload/".time().$_FILES["file"]["name"];
                        //转码，把utf-8转成gb2312,返回转换后的字符串， 或者在失败时返回 FALSE。
                        $filename =iconv("UTF-8","gb2312",$filename);
                         //检查文件或目录是否存在
                        if(file_exists($filename))
                        {
                            echo"该文件已存在";
                        }
                        else
                        {
                            //保存文件,   move_uploaded_file 将上传的文件移动到新位置
                            move_uploaded_file($_FILES["file"]["tmp_name"],$filename);//将临时地址移动到指定地址
                            $newf =  'http://'.$_SERVER['SERVER_NAME'].$filesn;
                            switch ($_POST['type']) {
                                case 1:
                                    $res = $this->luntu($newf,$type=$_POST['type'],$name='轮播图');
                                    break;
                                case 2:
                                    $res = $this->luntu($newf,$type=$_POST['type'],$name='走势图');
                                    break;
                                case 3:
                                    $res = $this->luntu($newf,$type=$_POST['type'],$name='迷你走势图');
                                    break;
                                case 4:
                                    $res = $this->luntu($newf,$type=$_POST['type'],$name='客服');
                                    break;
                                default:
                                    echo '类型错误！';die;
                                    break;
                            }

                            if($res){
                                echo '<p>'.$res.'预览 <a href="http://'.$_SERVER['SERVER_NAME'].'/oxc.php/home/upimg/kf">返回>>></a></p>';
                                echo "<img style='width:180px;' src='".$filesn."'>";
                            }else{
                                echo "保存失败";
                            }
                            

                        }
                }
                else
                {
                    echo"文件类型不对";
                }

        }

    }


    //客服
    function luntu($file,$type,$name){
        echo $file;
        $map = array(
            'obj' => $name,
            'types' => $type,
            'img' => $file,
            'msg' => $name
        );
        $res = M('config')->add($map);
        if($res){
            $msg = $name;
            return $msg;
        }else{
            $msg = 0;
            return $msg;
        }

    }

    // 配置图片
    function config(){
        $postdata = I('post.');
        // echo json_encode($postdata,JSON_UNESCAPED_UNICODE);die;

        if(empty($postdata['id'])){

            $res = M('config')->order('id asc')->select();
        }else{
            $id = (int)$postdata['id'];
            $img = $postdata['img'];

            $datamap['id'] = $id;
            $datamap['url'] = $postdata['url'];
            $datamap['img'] = $postdata['img'];
            $datamap['state'] = $postdata['state'];
            $config = M("config");
            $config->save($datamap);
            $res = M('config')->order('id asc')->select();
        }

        $data['data'] = $res;
        // echo '<pre>';
        // print_r($data);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }


}