import React, { useState } from "react";
import {  Flex, Spacer} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from "axios";
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";


const User =()=>{
    const toast = useToast()
    const navigate=useNavigate()
    const [feching,setFetching]=useState(false)
    const [deleting,setDeleting]=useState(false)

    const handlefetch=()=>{
        if(feching){
            toast({
                title: 'Data is Already Fetching',
                description: "",
                status: 'error',
                duration: 1000,
                position:"top",
                isClosable: true,
              }) 
              return
        }
        else{
            setFetching(true)
            axios.get(`https://cointab-backend-ysjl.onrender.com`)
            .then((r)=>{
               console.log(r.data)
               if(r.data.msg==="success"){
                   toast({
                       title: 'Data Fetched Successfully',
                       description: "",
                       status: 'success',
                       duration: 1000,
                       position:"top",
                       isClosable: true,
                     })
                
               }
               else{
                   toast({
                       title: 'Data Fetched Failed',
                       description: "",
                       status: 'error',
                       duration: 1000,
                       position:"top",
                       isClosable: true,
                     })
                    
               }
               setFetching(false)
            })
            .catch((e)=>{
               setFetching(false)
            })
        }
       
    }

    //   DELETE FUNCTION 

    function handledelete(){
          if (window.confirm('Are you sure you want to delete all the records?')) {
            axios.delete("https://cointab-backend-ysjl.onrender.com")
            .then((r)=>{
            console.log(r.data)
            if(r.data.msg==="success"){
                toast({
                    title: 'Data Deleted Successfully',
                    description: "",
                    status: 'success',
                    duration: 1000,
                    position:"top",
                    isClosable: true,
                  })
            }
            else{
                toast({
                    title: 'Data Fetched Failed',
                    description:`${r.data.msg}`,
                    status: 'error',
                    duration: 1000,
                    position:"top",
                    isClosable: true,
                  })
            }
            
         })
          }
          else{
            console.log("no")
          }

    }

    function handleshowdetail(){
       navigate("/userdetail")
    }


    return (
        <div>
        <br />
        <br />
            <Flex
            justifyContent="space-evenly"
            width="50%"
            margin="auto"
            >
            <Button colorScheme='blue'
              onClick={handlefetch}
            >Fetch User</Button>

            <Button colorScheme='red'
            onClick={handledelete}
            >Delete User</Button>

            <Button colorScheme='whatsapp'
            onClick={handleshowdetail}
            >User Detail</Button>
            </Flex>
        </div>
    )
}

export default User;