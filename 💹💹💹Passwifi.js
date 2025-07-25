import http from 'k6/http';
import { check } from 'k6';

// Danh sách 30 proxy bạn cung cấp.
// k6 sẽ chọn ngẫu nhiên một proxy từ danh sách này cho mỗi yêu cầu.
const proxies = [
    '47.252.29.28:11222',
    '8.210.117.141:8888',
    '58.186.92.153:16000',
    '89.58.45.94:43476',
    '72.10.160.174:26083',
    '57.129.81.201:8080',
    '13.57.11.118:3128',
    '54.219.186.252:9909',
    '104.238.30.16:34512',
    '200.174.198.86:8888',
    '38.147.98.190:8080',
    '147.75.34.105:443',
    '14.241.80.37:8080',
    '117.250.3.58:8080',
    '58.187.71.44:16000',
    '1.55.192.199:16000',
    '152.53.168.53:44887',
    '223.135.156.183:8080',
    '212.113.112.84:1080', // Đây có thể là SOCKS, có thể không hoạt động với http.get
    '195.88.71.201:8888',
    '85.133.240.75:8080',
    '8.219.97.248:80',

    '113.160.132.195:8080',
    '51.79.99.237:4502',
    '176.126.103.194:44214',
    '3.101.76.84:18242',
    '43.217.159.83:9080',
    '45.63.40.63:80',
    '18.179.46.106:999',
    '72.10.164.178:28247'
];

export const options = {
    stages: [
        { duration: '2s', target: 20000 },
        { duration: '2000m', target: 20000 },
    ],
    thresholds: {
        'http_req_duration': ['p(95)<800'],
        'http_req_failed': ['rate<0.01'],
    },
};

export default function () {
    // Chọn một proxy ngẫu nhiên từ danh sách
    const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];

    const targetUrl = __ENV.TARGET_URL || 'https://google.com';

    // Thực hiện yêu cầu GET thông qua proxy đã chọn
    // Lưu ý: k6 yêu cầu tiền tố 'http://' cho proxy
    const res = http.get(targetUrl, {
        proxy: `http://${randomProxy}`
    });

    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}
