# 과제 30

<aside>
💡

이제부터는 여러분이 직접 만들어보는 시간입니다! 지금까지 배웠던 내용들을 잘 생각해보면서, 각자 **컴포넌트를 만들고 재사용성을 고려하여** 기능을 구현해보세요. 이제는 더 이상 세세하게 가이드를 제공하지 않겠습니다. 여러분만의 스타일로 코드를 작성하고, 기능을 완성해가는 과정을 통해 **자기만의 방법을 찾아가시길** 바랍니다.

</aside>

- [ ] 완성된 `homework29`폴더를 활용하여 `homework30`을 완성해 주세요.
- [ ] `homework22`에서 퍼블리싱했던 마이페이지에서 포인트 충전하는 기능을 포트원을 이용하여 구현해주세요.

  ```
  스토어ID: store-abc39db7-8ee1-4898-919e-0af603a68317
  채널키: channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33 (카카오페이)
  ```

  1. 실습용 GraphQL의 포인트 충전 API 이름은 **`createPointTransactionsOfLoading`**입니다.
     해당 API를 이용해서 **포인트 결제 기능을 완성**해보세요!
  2. 반드시 테스트 모드로 진행해주세요.

fetchPointTransactions
-> 전체 포인트 거래 내역

fetchPointTransactionsOfLoading
-> 충전 내역

fetchPointTransactionsOfBuying
-> 구매 내역

fetchPointTransactionsOfSelling
-> 판매 내역
