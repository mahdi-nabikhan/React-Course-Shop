import React, { useEffect, useState } from 'react'
import DataTable from './../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
export default function Comments() {
  const [comments, setComments] = useState([])

  const getAllComment =()=>{
    fetch(`http://localhost:5000/v1/comments`).then(res.josn()).then(result => { setComments(result) })
  }
  useEffect(() => {
    getAllComment()
  }, [])
  const localStorageData = localStorage.getItem('users')
  const removecomment = (commentID) => {
    swal({
      title: 'ایا از حذف مطمئن هستید',
      icon: 'warning',
      buttons: ['اره', 'نه']
    }).then(result => {
      if (result) {
        fetch(`http://localhost:5000/auth/comments/${commentID}`, {
          method: 'DELETE',
          headers: {
            'Authoraztion': `Bearer ${localStorageData.token}`
          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: 'کاربر حذف شد',
              icon: 'success',
              buttons: 'ok'

            }).then(getAllUsers)
          }
        })

      }
    })


  }
  const showCommentBody = (commentBody) => {
    swal({
      title: commentBody,
      buttons: 'ok'
    })

  }
  const banUser = (userID) => {
    swal({
      title: 'مطمنی ',
      icon: 'warning',
      buttons: ['نه', 'اره']
    }).then(result => {
      if (result) {
        fetch(`http://localhost:5000/v1/users/ban/${userID}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorageData.token}`
          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: 'بن شد',
              icon: 'success',
              buttons: 'ok'
            })
          }
        }).then(()=>{
          getAllComment()
        })
      }
    })

  }
  const answerToComment = (commentID) =>{
    swal({
      title:'پاسخ را بنویس',
      content :'input',
      buttons:'ok'

    }).then(answerText =>{
      if (answerText){
        const answerBody ={
          body:answerText
        }
      fetch(`http://localhost:5000/v1/comments/answer/${commentID}`,{
        method:'POST',
        headers :{
          'Content-Type':'applications/json',
          Authorization: `Bearer ${localStorageData.token}`
        },
        body:JSON.stringify(answerBody)
      }).then(res =>{
        if (res.ok){
          swal({
            title:'ثبت شد',
            icon:'success',
          buttons:'ok'          })
        }
      })
    }

    })
  }
  return (
    <>
      <DataTable title='کامنت ها'>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>دوره</th>
              <th>مشاهده</th>
              <th>ثبت پاسخ</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {

              comments.map((comment, index) => {
                <tr>
                  <td className={comment.answer === 1 ?'answer-comment':'no-answer-comment'}>

                    {index + 1}
                    </td>
                  <td>{comment.creator.name}</td>
                  <td>{comment.course}</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={() => { showCommentBody(comment.body) }}>
                      مشاهده متن
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn" onCanPlay={()=> answerToComment(comment._id)}>
                      ثبت پاسخ
                    </button>
                  </td>
                  <td>ehsan1323</td>
                  <td>
                    <button type="button" class="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn" onClick={removecomment(comment._id)}>
                      حذف
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger delete-btn" onClick={banUser(comment.creator._id)}>
                      بن
                    </button>
                  </td>
                </tr>

              })
            }

          </tbody>
        </table>

      </DataTable>
    </>
  )
}
