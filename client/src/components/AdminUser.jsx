import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Space } from 'antd'
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { LapProHeader02, LapProUploadFile } from './style'
import TableComponent from './Message/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../utils'
import * as UserService from '../services/UserService'
import { useMutationHook } from '../hooks/useMutationHook'
// import Loading from '../components/Loading'
import * as message from '../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from './DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from './ModalComponent/ModalComponent'


const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);

  const [stateUserDetail, setStateUserDetail] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    avatar: '',
    address: ''
  })

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHook(
    (data) => {
      // console.log('data', data);
      const {
        id,
        token,
        ...rests
      } = data;
      const res = UserService.updateUser(
        id,
        { ...rests }, token
      )
      return res
    }
  );

  const mutationDeletedMany = useMutationHook(
    (data) => {
      const { 
        token, ...ids
      } = data
      const res = UserService.deleteManyUser(
        ids,
        token)
      return res
    },
  )

  const handleDeleteManyUsers = (ids) =>{
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

  const mutationDeleted = useMutationHook(
    (data) => {
      const { id,
        token,
      } = data
      const res = UserService.deleteUser(
        id,
        token)
      return res
    },
  )


  const getAllUsers = async () => {
    const res = await UserService.getAlllUser()
    return res
  }

  const fetchGetDetailUser = async (rowSelected) => {
    const res = await UserService.getDetailUser(rowSelected)
    if (res?.data) {
      setStateUserDetail({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        address: res?.data?.address,
        avatar: res?.data?.avatar
      })
    }
  }

  useEffect(() => {
    form.setFieldsValue(stateUserDetail)
  }, [form, stateUserDetail])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailUser(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  // console.log("satetProduct", stateUserDetail);
  const handleDetailsProduct = () => {
    // if (rowSelected) {
    //   fetchGetDetailUser()
    // }
    setIsOpenDrawer(true)
  }

  const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany

  const queryUser = useQuery({ queryKey: ['user'], queryFn: getAllUsers })
  const { data: users } = queryUser
  const renderAction = () => {
    return (
      <div>
        <EditOutlined style={{ color: 'orange', fontSize: '20px', cursor: 'pointer', paddingRight: '3px' }} onClick={handleDetailsProduct} />
        <DeleteOutlined style={{ color: 'red', fontSize: '20px', cursor: 'pointer', paddingLeft: '3px' }} onClick={() => setIsModalOpenDelete(true)} />
      </div>
    )
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },

    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },

    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },

    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      // ...getColumnSearchProps('isAdmin'),

      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        }
      ]
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = users?.data?.length && users?.data?.map((user) => {
    return { ...user, key: user._id, isAdmin: user.isAdmin ? 'True' : 'False' }
  })


  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isErrorDeleted])

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      message.success()
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDeletedMany])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)
    setStateUserDetail({
      name: '',
      email: '',
      phone: '',
      isAdmin: false
    })
    form.resetFields()
  }

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleDeleteUser = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
        setIsModalOpenDelete(false);
      }
    })
  }

  const handleOnchangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value
    })
  }

  // const handleOnchangeAvatar = async ({ fileList }) => {
  //   const file = fileList[0]
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setStateUser({
  //     ...stateUser,
  //     image: file.preview
  //   })
  // }

  const handleOnchangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetail({
      ...stateUserDetail,
      avatar: file.preview
    })
  }
  // console.log('user', user);
  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetail }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }
  return (
    <div>
      <LapProHeader02>Quản lý người dùng</LapProHeader02>
      
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDeleteMany={handleDeleteManyUsers} columns={columns} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: envnt => {
              setRowSelected(record._id)
            }
          }
        }} />
      </div>

      <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Form
          name="basic"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onUpdateProduct}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent value={stateUserDetail.name} onChange={handleOnchangeDetail} name="name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputComponent value={stateUserDetail.email} onChange={handleOnchangeDetail} name="email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <InputComponent value={stateUserDetail.phone} onChange={handleOnchangeDetail} name="phone" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <InputComponent value={stateUserDetail.address} onChange={handleOnchangeDetail} name="address" />
          </Form.Item>

          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[{ required: true, message: 'Please input your avatar!' }]}
          >
            <LapProUploadFile onChange={handleOnchangeAvatarDetail} maxCount={1}>
              <Button >Select File</Button>
              {stateUserDetail?.avatar && (
                <img src={stateUserDetail?.avatar} style={{
                  height: '60px',
                  width: '60px',
                  // borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px',
                }} alt="avatar" />
              )}
            </LapProUploadFile>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>

      <ModalComponent forceRender title='Xóa người dùng' open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
        <div>Bạn có chắc xóa tài khoản này không ?</div>
      </ModalComponent>
    </div>
  )
}

export default AdminUser