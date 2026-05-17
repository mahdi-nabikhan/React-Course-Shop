import React, { useEffect, useState } from 'react'
import DataTable from './../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import { minValidator } from "../../../validators/rules";
export default function Menu() {
  
  const [menuParent, setMenuParent] = useState("-1");
  const [menus,setMenus]=useState([])
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  
  function getAllMenus(){
    fetch(`http://localhost:5000/v1/menus/all`).then(res =>res.json()).then(allmenus => setMenus(allmenus))
  }
  useEffect(()=>{
    getAllMenus()

  },[])

  const removeMenu = (menuID)=>{
    swal({
      title:'مطمنی',
      icon:'warning',
      buttons : ['نه ','اره']
    }).then(result =>{
      if (result){
        fetch(`http://localhost:5000/v1/menus/${menuID}`,{
      method :'DELETE',
      headers :{
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('user').token)}`
      }
      
    }).then(res =>{
      if(res.ok){
        swal({
          title:'مطمنی ؟',
          icon:'success',
          buttons:'ok'
        }).then(()=>{
          getAllMenus
        })
      }
    }).then(result => {})
      }
    })
    

  }
  const createMenu = (event) => {
    event.preventDefault();

    const newMenuInfo = {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent: menuParent === "-1" ? undefined : menuParent,
    };

    fetch(`http://localhost:4000/v1/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuInfo),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        swal({
          title: "منوی جدید با موفقیت ایجاد شد",
          icon: "success",
          buttons: "اوکی",
        }).then((result) => {
          getAllMenus();
        });
      }
    });
  };
  return (
    <>
    <div class="container">
        <div class="home-title">
          <span>افزودن کاربر جدید</span>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">عنوان</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                validations={[minValidator(5)]}
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="name input">
              <label class="input-title">عنوان</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="href"
                type="text"
                isValid="false"
                validations={[minValidator(5)]}
                placeholder="لطفا عنوان را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="name input">
              <label class="input-title">عنوان</label>
              <select
                class="select"
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">منوی اصلی را انتخاب کنید</option>
                {menus.map((menu) => (
                  <>
                    {!Boolean(menu.parent) && (
                      <option value={menu._id}>{menu.title}</option>
                    )}
                  </>
                ))}
              </select>
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={createMenu} />
              </div>
            </div>
          </div>
        </form>
      </div>

     <DataTable title="منوها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>فرزند ...</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>{menu.parent ? menu.parent.title : (<i className="fa fa-check"></i>)}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={removeMenu(menu._id)}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    
    </>
  )
}
