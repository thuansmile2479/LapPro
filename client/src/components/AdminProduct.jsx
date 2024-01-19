import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Select, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { LapProHeader02, LapProUploadFile } from './style'
import TableComponent from './Message/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../utils'
import * as ProductService from '../services/ProductService'
import { useMutationHook } from '../hooks/useMutationHook'
// import Loading from '../components/Loading'
import * as message from '../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from './DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from './ModalComponent/ModalComponent'


const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  const [typeSelect, setTypeSelect] = useState('')

  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    rating: '',
    description: '',
    image: '',
    newType:'',
    discount: ''
  })

  const [stateProductDetail, setStateProductDetail] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    rating: '',
    description: '',
    image: '',
    discount: ''
  })

  const [form] = Form.useForm();

  const mutation = useMutationHook(
    (data) => {
      const {
        name,
        price,
        description,
        rating,
        image,
        type,
        countInStock, 
        discount } = data
      const res = ProductService.createProduct({
        name,
        price,
        description,
        rating,
        image,
        type,
        countInStock,
        discount
      })
      return res
    }
  )

  const mutationUpdate = useMutationHook(
    (data) => {
      console.log('data', data);
      const {
        id,
        token,
        ...rests
      } = data;
      const res = ProductService.updateProduct(
        id,
        token,
        { ...rests }
      )
      return res
    }
  );

  const mutationDeleted = useMutationHook(
    (data) => {
      const { id,
        token,
      } = data
      const res = ProductService.deleteProduct(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHook(
    (data) => {
      const {
        token, ...ids
      } = data
      const res = ProductService.deleteManyProduct(
        ids,
        token)
      return res
    },
  )


  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const fetchGetDetailProduct = async (rowSelected) => {
    const res = await ProductService.getDetailProduct(rowSelected)
    if (res?.data) {
      setStateProductDetail({
        name: res?.data?.name,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        price: res?.data?.price,
        rating: res?.data?.rating,
        description: res?.data?.description,
        image: res?.data?.image,
        discount: res?.data?.discount
      })
    }
  }

  useEffect(() => {
    form.setFieldsValue(stateProductDetail)
  }, [form, stateProductDetail])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailProduct(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  // console.log("satetProduct", stateProductDetail);
  const handleDetailsProduct = () => {
    // if (rowSelected) {
    //   fetchGetDetailProduct()
    // }
    setIsOpenDrawer(true)
  }

  const handleDeleteManyProducts = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    return res
  }

  const { data, isSuccess, isError } = mutation
  const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany

  const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
  const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
  const { data: products } = queryProduct
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
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>= 50',
          value: '>=',
        },
        {
          text: '<= 50',
          value: '<=',
        }
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 50
        }
        return record.price <= 50
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: '>= 3',
          value: '>=',
        },
        {
          text: '<= 3',
          value: '<=',
        }
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return Number(record.rating) >= 3
        }
        return Number(record.rating) <= 3
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return { ...product, key: product._id }
  })

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      message.success()
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDeletedMany])

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isErrorDeleted])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)
    setStateProductDetail({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      rating: '',
      description: '',
      image: ''
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

  const handleDeleteProduct = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
        setIsModalOpenDelete(false);
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setStateProduct({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      rating: '',
      description: '',
      image: '', 
      discount: ''
    })
    form.resetFields()
  }

  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      countInStock: stateProduct.countInStock,
      price: stateProduct.price,
      rating: stateProduct.rating,
      description: stateProduct.description,
      image: stateProduct.image,
      discount: stateProduct.discount
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
  }

  const handleOnchangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview
    })
  }
  // console.log('user', user);
  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetail }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value
    })
  }

  return (
    <div>
      <LapProHeader02>Quản lý sản phẩm</LapProHeader02>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}>
          <PlusOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDeleteMany={handleDeleteManyProducts} columns={columns} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: envnt => {
              setRowSelected(record._id)
            }
          }
        }} />
      </div>
      <ModalComponent forceRender title='Tạo sản phẩm' open={isModalOpen} onCancel={handleCancel} footer={null}>
        {/* <Loading isLoading={isLoading}> */}
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input your type!' }]}
          >
            <Select
              name="type"
              value={stateProduct.type}
              onChange={handleChangeSelect}
              options={renderOptions(typeProduct?.data?.data)}
            />
          </Form.Item>
          {stateProduct.type === 'add_type' && (
            <Form.Item
              label="New type"
              name="newType"
              rules={[{ required: true, message: 'Please input your type!' }]}
            > 
                <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" /> 
            </Form.Item>
          )}


          <Form.Item
            label="Count isStock"
            name="countInStock"
            rules={[{ required: true, message: 'Please input your isStock!' }]}
          >
            <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your price!' }]}
          >
            <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please input your rating!' }]}
          >
            <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please input your discount of product!' }]}
          >
            <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please input your count image!' }]}
          >
            <LapProUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button >Select File</Button>
              {stateProduct?.image && (
                <img src={stateProduct?.image} style={{
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
        {/* </Loading> */}
      </ModalComponent>


      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
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
            <InputComponent value={stateProductDetail.name} onChange={handleOnchangeDetail} name="name" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input your type!' }]}
          >
            <InputComponent value={stateProductDetail.type} onChange={handleOnchangeDetail} name="type" />
          </Form.Item>

          <Form.Item
            label="Count isStock"
            name="countInStock"
            rules={[{ required: true, message: 'Please input your isStock!' }]}
          >
            <InputComponent value={stateProductDetail.countInStock} onChange={handleOnchangeDetail} name="countInStock" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your price!' }]}
          >
            <InputComponent value={stateProductDetail.price} onChange={handleOnchangeDetail} name="price" />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please input your rating!' }]}
          >
            <InputComponent value={stateProductDetail.rating} onChange={handleOnchangeDetail} name="rating" />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please input your discount of product!' }]}
          >
            <InputComponent value={stateProductDetail.discount} onChange={handleOnchangeDetail} name="discount" />
          </Form.Item> 

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <InputComponent value={stateProductDetail.description} onChange={handleOnchangeDetail} name="description" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please input your count image!' }]}
          >
            <LapProUploadFile onChange={handleOnchangeAvatarDetail} maxCount={1}>
              <Button >Select File</Button>
              {stateProductDetail?.image && (
                <img src={stateProductDetail?.image} style={{
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

      <ModalComponent title='Xóa sản phẩm' open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        <div>Bạn có chắc xóa sản phẩm này không ?</div>
      </ModalComponent>
    </div>
  )
}

export default AdminProduct