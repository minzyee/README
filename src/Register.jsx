import React from 'react'

export default function Register() {
  return (
    <div>
      <h3 class="profile">프로필 설정</h3>
      <p>나중에 언제든지 변경할 수 있습니다.</p>
      <div class="img-modi">
        <img class="profile-img" src="../assets/test.png" alt="프로필 화면" />
        <button class="file-select">
          <img src="../assets/test_2.png" alt="파일선택">
        </button>
      </div>

      <form action="">
        <label for="userName">사용자 이름</label><br>
        <input type="text" id="userName" placeholder="2~10자 이내여야 합니다."><br>
        <label for="accountName">계정 ID</label><br>
        <input type="text" id="accountName" placeholder="영문,숫자,특수문자(.),(_)만 사용 가능합니다."><br>
        <label for="intro">소개</label><br>
        <input type="text" id="intro" placeholder="자신과 판매할 상품에 대해 소개해 주세요!">
      </form>
      <button class="start">README 시작하기</button>
    </div>
  )
}
