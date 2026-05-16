import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import {swal} from 'sweetalert'
export default function Contact() {

    const [contacts, setContacts] = useState([])
    function getAllContacts(){
      fetch('http://localhost:5000/v1/contact')
      .then(res => res.json())
      .then(allContacts => {
          console.log(allContacts);
          setContacts(allContacts)
      })
    }

    useEffect(() => {
       getAllContacts()
        }, [])

  const removeContact= (contactID)=>{
    const localStorageData = localStorage.getItem('user')
    swal({
      title:'مطمئنی ؟',
      icon:'warning',
      buttons:['اره','نه']
    }).then((result)=>{
      if(result){
        fetch(`http://localhost:5000/v1/contact/${contactID}`,{
          method:'DELETE',
          headers:{
            'Authorazition':`Bearer${localStorageData.token}`
          }
        }).then( res =>{
          if (res.ok){
            swal({
              title:'پیغام مورد نظر حذف شد',
              icon:'success',
              buttons:'ok'
            }).then(
              getAllContacts()
            )
          }
        })
      }
    })

  }

  const sendAnwserToUser = (contactEmail) =>{
    swal({
      title:'متن را وارد کنید',
      contact:'input',
      buttons:'ارسال'
    }).then(
      res =>{
        const answerInfo = {
          email:contactEmail,
          answer:res.value
        }
        const localStorageData= localStorage.getItem('user')
        fetch(`http://localhost:5000/v1/contact/answer/`,{
          method:'POST',
          headers :{
            "Content-Type": "application/json",
            'Authorization':`Bearer${localStorageData.token}`
          },body:JSON.stringify(answerInfo)
        }).then(res =>{
          if (res.ok){
            return res.json()
          }
        }).then((result)=>{console.log(result)})
      }
    )

  }

  return (
    <>
      <DataTable title="پیغام‌ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
          {contacts.map((contact, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn" onClick={()=>{sendAnwserToUser(contact.email)}}> پاسخ 
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn" onClick={removeContact(contact.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
