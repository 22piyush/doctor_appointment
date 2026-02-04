import React from 'react'
import { assets } from '../../assets_admin/assets'

function AddDoctor() {
  return (
    <div>
      <form action="">
        <p>Add Soctor</p>

        <div>
          <div>
            <label htmlFor="">
              <img src={assets.upload_area} alt="upload_area" />
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor