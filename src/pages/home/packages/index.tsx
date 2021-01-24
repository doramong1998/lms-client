import { Button, Card, Col, Row } from 'antd'
import React, { FunctionComponent } from 'react'
import './styles.scss'

const { Meta } = Card
export interface Props { }

const Packages: FunctionComponent<Props> = () => {
  return (
    <>
      <div className='header mb--24'>
        <h2>CÁC KHÓA HỌC LẬP TRÌNH OFFLINE TẠI HÀ NỘI</h2>
        <p>Các khóa học lập tình offline sẽ cung cấp đầy đủ kiến thức chuyên môn và giúp học viên trải nghiệm môi trường vừa học vừa làm trong thực tế, giúp các bạn tự tin khi đi làm.</p>
      </div>
      <Row gutter={50} className='m--50'>
        <Col span={6}>
          <Card
            actions={[
              <Button key='button' className='float--right mr--24' type='primary'>Xem thêm</Button>,
            ]}
            className='margin--auto'
            hoverable
            cover={<img alt="example" className='h--250' src="https://hackernoon.com/images/z2xg2bpo.jpg" />}
          >
            <Meta title="Khóa học Reactjs" description="Khóa học nâng cao về Reactjs" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className='margin--auto'
            actions={[
              <Button className='float--right mr--24' key='button' type='primary'>Xem thêm</Button>,
            ]}
            hoverable
            cover={<img alt="example" className='h--250' src="https://canhme.com/wp-content/uploads/2018/09/Nodejs.png" />}
          >
            <Meta title="Khóa học Nodejs" description="Khóa học nâng cao về Nodejs" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            actions={[
              <Button key='button' className='float--right mr--24' type='primary'>Xem thêm</Button>,
            ]}
            className='margin--auto'
            hoverable
            cover={<img alt="example" className='h--250' src="https://repository-images.githubusercontent.com/24195339/87018c00-694b-11e9-8b5f-c34826306d36" />}
          >
            <Meta title="Khóa học Angular" description="Khóa học nâng cao về Angular" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            actions={[
              <Button key='button' className='float--right mr--24' type='primary'>Xem thêm</Button>,
            ]}
            className='margin--auto'
            hoverable
            cover={<img alt="example" className='h--250' src="https://www.laramind.com/blog/wp-content/uploads/2019/11/1_-PlqbnwqjqJi_EVmrhmuDQ.jpg" />}
          >
            <Meta title="Khóa học Vuejs"  description="Khóa học nâng cao về Vuejs" />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Packages
