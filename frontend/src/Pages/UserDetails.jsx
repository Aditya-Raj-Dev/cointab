import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Heading } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

const UserDetails =()=>{
    const [data,setData]=useState([])
    const [maindata,setMaindata]=useState([])
    const [page,setPage]=useState(1)
    const butt=[5,4,3,2,1]

    const fetchUserdetail=(page=1)=>{
      axios.get(`https://cointab-backend-ysjl.onrender.com/detail?page=${page}`)
      .then((r)=>{
        setData(r.data.data)
        setMaindata(r.data.data)
        setPage(page)
      })
    }

   function handlepageChange(p){
     fetchUserdetail(p)
   }
  

   function handlefilter(e){
      console.log(e.target.value)
      const dummydata=maindata.filter((item)=>{
        return item.gender===e.target.textContent
      })
      setData(dummydata)
   }

    useEffect(()=>{
        fetchUserdetail()
    },[])

    return (
        <div>
            <Heading as='h2' size='xl'>
              USER DETAILS
            </Heading>
            <Flex  paddingLeft="30px">
            <Menu  >
            <MenuButton
              fontSize={["13px", "16px"]}
              as={Button} >
              Select gender
            </MenuButton>
            <br />
              <MenuList>
              <MenuItem onClick={fetchUserdetail}>Both</MenuItem>
              <MenuItem onClick={handlefilter}>male</MenuItem>
              <MenuItem onClick={handlefilter}>female</MenuItem>
            </MenuList>
          </Menu>
            </Flex>
           
          <br />
       <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead style={{ backgroundColor: "#f2f2f2", fontWeight: "bold" }}>
        <tr>
        <td style={{ border: "1px solid #dddddd", padding: "8px" }}>Image</td>
          <td style={{ border: "1px solid #dddddd", padding: "8px" }}>Name</td>
          <td style={{ border: "1px solid #dddddd", padding: "8px" }}>Email</td>
          <td style={{ border: "1px solid #dddddd", padding: "8px" }}>Gender</td>
          <td style={{ border: "1px solid #dddddd", padding: "8px" }}>Age</td>
          <td style={{ border: "1px solid #dddddd", padding: "8px" }}>City</td>
          <td style={{ border: "1px solid #dddddd", padding: "8px" }}>State</td>
        </tr>
      </thead>
      {
        data && data.map((item)=>(
            <tbody key={item._id}>
            <tr>
                <td style={{ border: "1px solid #dddddd", padding: "8px",}}>
                    <center>
                      <img src={item.image} width="45px" />
                    </center>
                </td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{item.fname} {item.lname}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{item.email}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{item.gender}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{item.age}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{item.city}</td>
                <td style={{ border: "1px solid #dddddd", padding: "8px" }}>{item.state}</td>
            </tr>
            </tbody>
        ))
       
      }
    
    </table>
    <Flex
    direction="row-reverse"
    paddingRight="2rem"
    gap="10px">
        {
            butt.map((item)=>(
                 <Button colorScheme='cyan' isDisabled={page===item}
                 onClick={()=>handlepageChange(item)}
                 >{item}</Button>
            ))
        }
        </Flex>
        </div>
    )
}

export default UserDetails