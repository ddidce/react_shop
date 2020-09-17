import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
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
                <button className="btn btn-danger">주문하기</button> 
                <button className="btn btn-danger" onClick={() => {
                    //뒤로가기 goBack사용
                    history.goBack();
                }}>뒤로가기</button> 
            </div>
        </div>
    </div> 
    )
}

export default Detail
