// Default
import http from 'k6/http';
// Remoto
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.4.0/s3/js';
// Local
import runTest from './test1.js'


export default function(){
    let res =  http.get('http://test.k6.io');
    sleep(1);

    check(res, {
            'status code é 200': (r) => r.status === 200
    })
}
