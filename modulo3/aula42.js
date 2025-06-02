import http, { request } from 'k6/http';
import { Counter} from 'k6/metrics';
import { Gauge } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { Trend } from 'k6/metrics';


export const options = {
    vus: 1,
    duration: '3s'
}

const chamadas = new Counter('quantidade_de_chamadas');
const myGauge = new Gauge('tempo_bloqueado');
const MyRate = new Rate('taxa_req_200');
const MyTrend = new Trend('taxa_de_espera')


export default function(){
    const res =  http.get('http://test.k6.io');
    // contador
    chamadas.add(1)
    // medidor
    myGauge.add(res.timings.blocked);
    // taxa
    MyRate.add(res.status === 200);
    // tendencia
    MyTrend.add(res.timings.waiting);
}