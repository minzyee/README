import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FollowCount from '../../../molecules/FollowCount/FollowCount';
import ProfileDsc from '../../../molecules/ProfileDsc/ProfileDsc';
import ProfileImg from '../../../molecules/ProfileImg/ProfileImg';
import ButtonGroupMy from '../../../molecules/ButtonGroupMy/ButtonGroupMy';
import AuthContext from '../../../../store/auth-context';

const ProfileMyWrapper = styled.div`
    width: 390px;
    height: 314px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CounterDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export default function ProfileMyOrg() {
    // 나의 프로필 정보 가져오기
    const [profile, setProfile] = useState([]);
    const token = useContext(AuthContext).token;
    const API_HOST = process.env.REACT_APP_BASE_URL;

    const config = {
        method: 'get',
        url: `${API_HOST}/user/myinfo`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    };

    useEffect(() => {
        axios(config)
            .then(res => {
                setProfile(res.data.user);
                console.log(res.data.user);
            })
            .then(err => console.log(err));
    }, []);

    return (
        <ProfileMyWrapper>
            <CounterDiv>
                <FollowCount count={profile.followerCount} kind="follower" />
                <ProfileImg src={`${API_HOST}/${profile.image}`} alt="ProfileImg" />
                <FollowCount count={profile.followingCount} kind="following" />
            </CounterDiv>
            <ProfileDsc username={profile.username} userId={profile.accountname} userDesc={profile.intro} />
            <ButtonGroupMy />
        </ProfileMyWrapper>
    );
}
