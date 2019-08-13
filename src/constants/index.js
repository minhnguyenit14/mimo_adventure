export { default as PATH } from './path';


export const PRODUCT = [
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
        key: "-1",
        title: "Trang chủ",
        children: []
    },
    {
        key: "-2",
        title: "Sản phẩm",
        children: [...PRODUCT]
    },
    {
        key: "-3",
        title: "Về chúng tôi",
        children: []
    },
    {
        key: "-4",
        title: "Liên hệ",
        children: []
    },
]