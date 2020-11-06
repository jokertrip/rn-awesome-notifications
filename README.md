### Description

before

    const wrapped1 = wrapper1(Component);
    const wrapped2 = wrapper2(wrapped1);
    const wrapped3 = wrapper3(wrapped2);
    export default wrapped3;

after

    export default compose(
      wrapped1,
      wrapped2,
      wrapped3
    )(Component);

### Installation

```sh
npm i --save "git+https://github.com/AleksandrNikolaevich/rn-awesome-notifications.git"
```


```sh
npx pod-install
```