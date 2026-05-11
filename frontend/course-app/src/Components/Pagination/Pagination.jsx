import React, { useEffect, useState } from "react";

import "./Pagination.css";
import { useParams } from "react-router";

export default function Pagination({items,itemCount,pathName,setShownCourses}) {
  const {page}=useParams()
  const [pageCount,setPageCount]=useState(null)
  useEffect(()=>{
    let endIndex = itemCount * page
    let startIndex = endIndex - itemCount
    let paginatedItem = items.slice(startIndex,endIndex)
    setShownCourses(paginatedItem)
    let pageNumber = Math.ceil(items.lenght / itemCount)
    setPageCount(pageNumber)

  },[page])
  return (
    <div class="courses-pagination">
      <ul class="courses__pagination-list">
        <li class="courses__pagination-item">
          <a href="#" class="courses__pagination-link">
            <i class="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
          </a>
        </li>
        <li class="courses__pagination-item">
          <a href="#" class="courses__pagination-link">
            1
          </a>
        </li>
        <li class="courses__pagination-item">
          <a href="#" class="courses__pagination-link">
            2
          </a>
        </li>
        <li class="courses__pagination-item">
          <a
            href="#"
            class="courses__pagination-link courses__pagination-link--active"
          >
            3
          </a>
        </li>
        <li class="courses__pagination-item">
          <a href="#" class="courses__pagination-link">
            <i class="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
