import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {stockContext} from './App.js';
import { Nav } from 'react-bootstrap';
import {CSSTransition} from "react-transition-group";
import './Detail.scss';

const Box = styled.div`
    padding : 20px;
`;

const StyleTitle = styled.h4`
    font-size : 25px;
    color : ${props => props.colors}
`;

const Detail = (props) => {

    /*
    //내가 만든 방식
    useEffect(()=> {
        // 2초 후에 저기 laert창을 안보이게 해주세요
        setTimeout(()=> {
            document.getElementById("none").style.display ="none";
        }, 2000)
    })
    */
    const [alert, setAlert] = useState(true);
    const [input, setInput] = useState('');
    const [tab, setTab] = useState(0);
    const [change, setChange] = useState(false);

    const stock = useContext(stockContext);

    useEffect(() => {

        const timer = setTimeout(() => {setAlert(false)}, 2000);
        //디테일 컴포넌트가 사라질때 타이머를 제거해줌
        return () => {clearTimeout(timer)}
        // [alert] <- alert라는 state가 변경이 될때만 실행
    },[alert])

    

    const {id} = useParams();
    const productContact = props.shoes.find((product) => {
        return product.id == id;
    })
    const history = useHistory();
    return (
    <div className="container">
        <Box>
            <StyleTitle className="red">Detail</StyleTitle>
        </Box>

        <input onChange={(e) => {setInput(e.target.value)}} />
        {input}
        {
            alert === true
            ?   <div className="my-alert my-alert2" id="none">
                    <p>재고가 얼마 남지 않았습니다.</p>
                </div>
            : null
        }
        
        <div className="row">
            <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6 mt-4">
                <h4 className="pt-5">{productContact.title}</h4>
                <p>{productContact.content}</p>
                <p>{productContact.price} 원</p>

                <Info stock = {props.stock} />
                <button className="btn btn-danger" onClick={() => {props.setStock([9,11,12])}}>주문하기</button> 
                <button className="btn btn-danger" onClick={() => {
                    //뒤로가기 goBack사용
                    history.goBack();
                }}>뒤로가기</button> 
            </div>
        </div>

        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
                <Nav.Link eventKey="link-0" onClick={()=>{setChange(false); setTab(0)}}>Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={()=>{setChange(false); setTab(1)}}>Option 2</Nav.Link>
            </Nav.Item>
        </Nav>
        <CSSTransition in={change} classNames="wow" timeout={500}>
            <TabContent tab={tab} setChange={setChange}/>
        </CSSTransition>
    </div>
    )
}

function TabContent(props){

    useEffect(()=> {
        props.setChange(true);
    })
    if(props.tab === 0) {
        return <div>0번째 내용입니다</div>
    }
    else if(props.tab === 1){
        return <div>1번째 내용입니다.</div>
    }
    else if(props.tab === 2) {
        return <div>2번쨰 내용입니다.</div>
    }
}

function Info(props) {
    return (
        <p>재고 : {props.stock[0]}</p>
    )
}

export default Detail
