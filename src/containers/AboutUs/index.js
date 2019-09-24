import React, { PureComponent } from 'react';
import { PageLayout, Heading, Paragraph, Col, Link } from 'app-commons';
import cls from './styles.module.scss';
import { getStorage } from 'app-helpers';

class AboutUs extends PureComponent {
    state = {
        companyInfo: {}
    };
    waitForGettingCache = null;

    componentDidMount() {
        let cache = getStorage();
        if (!cache) {
            this.waitForGettingCache = setInterval(() =>
                this.applyCache(), 100);
        } else {
            if (!cache.companyInfo || Object.keys(cache.companyInfo).length === 0) {
                this.waitForGettingCache = setInterval(() =>
                    this.applyCache(), 100);
            } else {
                this.applyCache(cache)
            }
        }
    }

    applyCache(cache = getStorage()) {
        if (cache.companyInfo) {
            if (Object.keys(cache.companyInfo).length > 0) {
                this.setState({
                    companyInfo: cache.companyInfo
                })
                clearInterval(this.waitForGettingCache);
            }
        }
    }

    render() {
        const { companyInfo } = this.state;
        return (
            <PageLayout
                bodyClassName={window.classnames(cls.bodyRoot)}
            >
                <Heading>
                    Thương hiệu {companyInfo.CompanyName}
                </Heading>
                <div className={window.classnames(cls.content)}>
                    <Col>
                        <Heading type={3}>
                            Vài nét về thương hiệu
                    </Heading>
                        <Paragraph>
                            Thương hiệu {companyInfo.CompanyName} mới được thành lập vào cuối năm 2018. Tuy nhiên, chúng tôi đã có kinh nghiệm hơn hai mươi năm trong lĩnh vực khai thác và sản xuất các loại nông – lâm – khoáng sản quý, cho năng suất cao như: phát triển cây cà phê, nuôi cấy để tạo trầm hương, khai thác các loại cây gỗ quý, đá quý,… Ban đầu, chúng tôi chỉ tập trung vào công đoạn chế biến và sản xuất các sản phẩm thô từ nguyên liệu có sẵn nhằm cung cấp cho các thương hiệu lớn khác. Nay, Ban lãnh đạo đã vạch ra hướng đi mới, theo sát tình hình chung của xã hội. Để phù hợp với nhu cầu về hàng hoá của thị trường cũng như đảm bảo sự phát triển bền vững của công ty, việc cho ra đời một Thương hiệu riêng là điều tất yếu.
                    </Paragraph>
                    </Col>

                    <br />

                    <Col>
                        <Heading type={3}>
                            I.	Mục tiêu – Phương châm của chúng tôi
                    </Heading>
                        <Paragraph>
                            Phương châm của {companyInfo.CompanyName} là cung cấp những sản phẩm THẬT nhất, SẠCH nhất cho khách hàng nhằm BẢO VỆ SỨC KHOẺ cộng đồng cũng như MÔI TRƯỜNG SỐNG của chúng ta.
             Chúng tôi cam kết phân phối các sản phẩm có nguồn gốc 100% từ thiên nhiên, không hoá chất, không gây độc hại cho sức khoẻ con người. Các sản phẩm của chúng tôi luôn hướng tới việc sử dụng vật liệu thân thiện với môi trường. Chúng tôi hạn chế tối đa việc đưa vào chất liệu nylon khi sản xuất bao bì, nhãn mác. Bởi chúng tôi mong muốn đem lại cuộc sống bền vững cho khách hàng của mình. Có vậy, thương hiệu mới vững mạnh. Chính họ là những nhân tố giúp gắn kết, nắm trong tay sự tồn tại của thương hiệu.
                    </Paragraph>
                    </Col>

                    <br />

                    <Col>
                        <Heading type={3}>
                            II.	Thông tin về thương hiệu
                    </Heading>

                        <Paragraph>
                            1.	Tên thương hiệu: &nbsp;<strong>{companyInfo.CompanyName}</strong>
                        </Paragraph>

                        <Paragraph>
                            2.	Đăng ký lần đầu: &nbsp;13/12/2018
                    </Paragraph>

                        <Paragraph>
                            3.	Trụ sở: &nbsp;{companyInfo && companyInfo.CompanyHeadOffice}
                        </Paragraph>

                        <Paragraph>
                            4. Địa chỉ phân phối: &nbsp;{companyInfo && companyInfo.CompanyShowRoom}
                        </Paragraph>

                        <Paragraph>
                            5.	Hotline: &nbsp;{companyInfo && companyInfo.CompanyPhone}
                        </Paragraph>

                        <Paragraph>
                            6.	Facebook: &nbsp;{companyInfo && <Link
                                className={window.classnames(cls.infoParagraph)}
                                href={companyInfo.CompanyFacebook}
                                target='_blank'
                                rel="noopener noreferrer"
                            >
                                {companyInfo.CompanyName}
                            </Link>}
                        </Paragraph>
                    </Col>

                    <br />

                    <Col className={window.classnames(cls.tableContainer)}>
                        <Heading type={3}>
                            III.	Danh sách các sản phẩm Công ty cung cấp
                        </Heading>
                        <Col className={window.classnames(cls.tableWrapper)}>
                            <table className={window.classnames(cls.table)}>
                                <thead>
                                    <tr>
                                        <th>
                                            <Heading type={3}>STT</Heading>
                                        </th>
                                        <th>
                                            <Heading type={3}>Sản phẩm</Heading>
                                        </th>
                                        <th>
                                            <Heading type={3}>Phân loại</Heading>
                                        </th>
                                        <th>
                                            <Heading type={3}>Quy cách</Heading>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowSpan={3}>
                                            <Paragraph>1</Paragraph>
                                        </td>
                                        <td rowSpan={3}>
                                            <Paragraph><b>Cà phê Túi lọc</b></Paragraph>
                                        </td>
                                        <td>
                                            <Paragraph>Sunrise (đỏ)</Paragraph>
                                        </td>
                                        <td rowSpan={3}>
                                            <Paragraph>Hộp (12 gói)</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Brighten (xanh)</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Sunset (nâu)</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td rowSpan={4}>
                                            <Paragraph>2</Paragraph>
                                        </td>
                                        <td rowSpan={4}>
                                            <Paragraph><b>Nhang Trầm hương</b></Paragraph>
                                        </td>
                                        <td>
                                            <Paragraph>Truyền thống</Paragraph>
                                        </td>
                                        <td>
                                            Hộp (50 nén)
                                    </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Cao cấp</Paragraph>
                                        </td>
                                        <td>
                                            Hộp (7 nén)
                                    </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Thư giãn</Paragraph>
                                        </td>
                                        <td>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Trầm nụ</Paragraph>
                                        </td>
                                        <td>
                                            Hộp (55 gram)
                                    </td>
                                    </tr>
                                    <tr>
                                        <td rowSpan={2}>
                                            <Paragraph>3</Paragraph>
                                        </td>
                                        <td rowSpan={2}>
                                            <Paragraph><b>Tinh dầu</b></Paragraph>
                                        </td>
                                        <td>
                                            <Paragraph>Sả chanh</Paragraph>
                                        </td>
                                        <td rowSpan={2}>
                                            <Paragraph>Lọ 100ml/ 30ml</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Quế</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td rowSpan={10}>
                                            <Paragraph>4</Paragraph>
                                        </td>
                                        <td rowSpan={10}>
                                            <Paragraph><b>Sản phẩm Thủ công mỹ nghệ</b></Paragraph>
                                        </td>
                                        <td>
                                            <Paragraph>Vòng tay Trầm hương Thiên nhiên</Paragraph>
                                        </td>
                                        <td rowSpan={10}>
                                            <Paragraph>Chiếc</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Vòng dây Trầm hương Thiên nhiên</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Vòng dây Trầm hương nuôi</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Vòng tay Gỗ sưa đỏ/ trắng</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Vòng dây Gỗ sưa đỏ/ trắng</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Bút Gỗ sưa đỏ</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Bút Ngà voi</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Vòng Ngà voi</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Tượng Ngà voi</Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>Tượng gỗ Trầm hương, Sưa, Tử đàn, Hoàng đàn, Thuỷ tùng, Trắc dây,… </Paragraph>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Paragraph>5</Paragraph>
                                        </td>
                                        <td>
                                            <Paragraph><b>Đá quý phong thuỷ</b></Paragraph>
                                        </td>
                                        <td>
                                            <Paragraph>Mã não, Caxedon, Thạch anh tóc,…</Paragraph>
                                        </td>
                                        <td>
                                            <Paragraph>Chiếc</Paragraph>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Col>
                </div>
            </PageLayout >
        );
    }
}

export default AboutUs;