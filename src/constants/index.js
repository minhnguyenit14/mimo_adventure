import PATH from './path';

export { default as PATH } from './path';
export * from './api';
export * from './query';
export * from './status';

export const MENU_HOME_ID = "home";
export const MENU_PRODUCT_ID = "product";
export const MENU_BLOG_ID = "blog";
export const MENU_ABOUT_US_ID = "aboutUs";
export const MENU_CONTACT_ID = "contact";

export const PRODUCT_MENU = [
    {
        key: "1",
        title: "Đồ gỗ",
        children: [
            {
                key: "2",
                title: "Bàn",
                children: [
                    {
                        key: "3",
                        title: "Bàn dài",
                        children: []
                    },
                    {
                        key: "4",
                        title: "Bàn ngắn",
                        children: []
                    },
                ]
            },
            {
                key: "5",
                title: "Ghế",
                children: [
                    {
                        key: "6",
                        title: "Ghế đẩu",
                        children: []
                    },
                    {
                        key: "7",
                        title: "Ghế đặc biệt",
                        children: []
                    },
                ]
            },
        ]
    },
    {
        key: "8",
        title: "Đồ gốm",
        children: [
            {
                key: "9",
                title: "Linh thú",
                children: [
                    {
                        key: "10",
                        title: "Thiên Long",
                        children: []
                    },
                    {
                        key: "11",
                        title: "Phượng hoàng",
                        children: []
                    },
                ]
            },
            {
                key: "12",
                title: "Bình gốm",
                children: [
                    {
                        key: "13",
                        title: "Lọ lục bình",
                        children: []
                    },
                    {
                        key: "14",
                        title: "Lọ cắm hoa",
                        children: []
                    },
                ]
            },
        ]
    }
]

export const MENU = [
    {
        key: MENU_HOME_ID,
        seoTitle: PATH.HOME,
        title: "Trang chủ",
        children: []
    },
    {
        key: MENU_PRODUCT_ID,
        seoTitle: PATH.LIST_PRODUCTS,
        title: "Sản phẩm",
        children: []
    },
    {
        key: MENU_BLOG_ID,
        seoTitle: PATH.BLOG,
        title: "Blog",
        children: []
    },
    {
        key: MENU_ABOUT_US_ID,
        seoTitle: PATH.ABOUT_US,
        title: "Về chúng tôi",
        children: []
    },
    {
        key: MENU_CONTACT_ID,
        seoTitle: PATH.CONTACT,
        title: "Liên hệ",
        children: []
    },
]

export const PRODUCTS = [
    {
        id: '1',
        src: require('assets/images/slick/1.jpg'),
        title: 'Tượng phật Quan Âm',
        subTitle: 'Tượng thạch'
    },
    {
        id: '2',
        src: require('assets/images/slick/2.jpg'),
        title: 'Bàn gỗ sồi',
        subTitle: 'Đồ gỗ'
    },
    {
        id: '3',
        src: require('assets/images/slick/3.jpg'),
        title: 'Bình ngũ sắc',
        subTitle: 'Đồ gốm'
    },
    {
        id: '4',
        src: require('assets/images/slick/1.jpg'),
        title: 'Tượng phật Quan Âm',
        subTitle: 'Tượng thạch'
    },
    {
        id: '5',
        src: require('assets/images/slick/2.jpg'),
        title: 'Bàn gỗ sồi',
        subTitle: 'Đồ gỗ'
    },
    {
        id: '6',
        src: require('assets/images/slick/3.jpg'),
        title: 'Bình ngũ sắc',
        subTitle: 'Đồ gốm'
    },
]