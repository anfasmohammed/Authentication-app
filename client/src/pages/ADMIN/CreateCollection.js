import React, { useEffect, useState } from 'react'
import AdminLayput from '../../components/AdminLayput'
import axios from 'axios'
import { Delete, Edit } from '@mui/icons-material'
import { toast } from 'sonner'
import CollectionForm from '../../components/FORMS/CollectionForm'
import {Button, Modal} from 'antd'

const CreateCollection = () => {
  const [collection,setCollection]=useState([])
  const [name,SetName]=useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updatedName,SetupdatedName]=useState("")
  const [selected,SetSelected]=useState(null)
  //ant design model
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // handle submit
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.post("/api/v1/collection/create-collection",{name})
      if (data?.success) {
        getAllCollection()
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      
      toast.error("something went wrong while creating collection")
    }
  }

  //get all collection
  const getAllCollection=async()=>{
    try {
      const {data}=await axios.get('/api/v1/collection/getAllCollection')
      if (data.success) {
        toast.success(data.message)
        setCollection(data.collection)
      }
    } catch (error) {
      console.log(error);
      toast.error("somting went wrong in getting collection" )
      
    }
  }

  //delete collection
  const deleteCollection =async(id)=>{
    try {
      const {data}=await axios.delete(`/api/v1/collection/delete-collection/${id}`)
      if (data.success) {
        getAllCollection()
        toast.success(data.message)
        setCollection(data.collection)
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting collection")
    }
  }
  useEffect(()=>{getAllCollection()},[])
  // update collection
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.put(`/api/v1/collection/update-collection/${selected._id}`,{name:updatedName})
      if (data && data.success)
      {SetSelected(null)
        SetupdatedName("")
        handleCancel()
        getAllCollection()
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating collection")
      
      
    }
  }
  return (
    <div className='flex gap-2'>
      <div><AdminLayput/></div>
      <div className='p-2 flex flex-col items-start gap-2'>
      <h1 className='text-3xl font-semibold'>Manage collection</h1>
      <div><CollectionForm handleSubmit={handleSubmit} value={name} setValue={SetName}/></div>
      <table className='min-w-[500px] text-lg border'>
        <thead className='rounded-lg bg-slate-700 border'>
          <tr>
            <th className='p-3 text-left'>name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            collection && collection.map((item)=>(
              <tr className='border'>
                <td key={item._id}className='border px-2' >{item.name}</td>
                <td><Edit onClick={()=>{setIsModalOpen(true);SetSelected(item);SetupdatedName(item.name)}}/><Delete onClick={()=>{deleteCollection(item._id)}}/></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
      <Modal title="Update collection" open={isModalOpen}  onCancel={handleCancel}
      footer={
        [<Button onClick={handleCancel}>Cancel</Button>]
      } >
        <CollectionForm value={updatedName} setValue={SetupdatedName} handleSubmit={handleUpdate}/>
      </Modal>
    </div>
  )
}

export default CreateCollection