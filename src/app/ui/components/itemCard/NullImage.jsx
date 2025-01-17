'use client'
import React from 'react'
import styles from './NullImage.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons'

function NullImage() {
  return (
    <div className={styles.nullImage}>
      <FontAwesomeIcon icon={faBoxesStacked}/>
      <span>Không có ảnh sản phẩm</span>
    </div>
  )
}

export default NullImage