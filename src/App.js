import { Button , Form, Input,Modal } from 'antd';
import React,{useState} from 'react';
import './App.less'
function App() {
  // 所有评论的内容
  const [comment,setComment] = useState([])
  // 对话框展示与否
  const [isModalVisible,setShow] = useState(false)
  // 修改的第一个input框
  const [input1,setInput1] = useState('')
  // 修改的第二个input框
  const [input2,setInput2] = useState('')
  // 修改评论的索引值
  const [index,setIndex] = useState('')
  // 表单实例
  const [form] = Form.useForm();
  const handlerChange1 = (e) => {
     setInput1(val=>val = e.target.value)
    
  }
  const handlerChange2 = (e) => {
    setInput2(val=>val=e.target.value)
 }
  const onFinish = (values) => {
    setComment(value=>{
      value.push(values)
      return [...value]
    } )
    form.resetFields()
    console.log(values,comment)
  };
  const handleOk = () => {
    setShow(val=>val=false)
    setComment(val=>{
      val.splice(index,1,{person:input1,content:input2})
      return val
     })

  }
  const handleCancel = () => {
     setShow(val=>val=false)
  }
  const handlerContent = (item,index) => {
    setShow(val=>val = true)
    setInput1(val=>val = item.person)
    setInput2(val=>val = item.content)
    setIndex(val=>val = index)
    
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const deleteContent = (index) => {
    setIndex(val=>val=index)
    setComment(item=>{
      item.splice(index,1)
      return [...item]
    })
  }
  
  return (
    <div className="App">
        <Form form={form} name="basic" labelCol={{span: 8,}} wrapperCol={{ span: 16,}}
      initialValues={{
        remember: true,
      }}
       className="main"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
         <Form.Item  rules={[{ required: true}]} label="评论人" name="person">
          <Input />
        </Form.Item>
        <Form.Item rules={[{ required: true}]} label="评论内容" name="content">
          <Input />
        </Form.Item>
        <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          发表评论
        </Button>
      </Form.Item>
      </Form>
     {
       comment.map((item,index)=>{
         return(
           <div  className="list" key={index}>
             <ul >
             <li>
               <h2>评论人：{item.person}</h2>
               <p>评论内容：{item.content}</p>
             </li>
           </ul>
           <Button type="primary" style={{'marginRight':'20px'}} onClick={()=>handlerContent(item,index)}>修改</Button>
           <Button type="danger" onClick={()=>deleteContent(index)}>删除</Button>
           </div>
         )
       })
    
     }
      <Modal title="修改内容" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} cancelText="取消" okText="确认">
        <Input style={{'marginBottom':'10px'}} value={input1} onChange={handlerChange1}/>
        <Input value={input2} onChange={handlerChange2}/>
      </Modal>
    </div>
  );
}

export default App;
