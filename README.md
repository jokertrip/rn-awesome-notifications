### Description



### Installation

```sh
npm i --save @alexzunik/rn-awesome-notifications
```


#### Install require dependences

1. [@react-native-community/blur](https://github.com/Kureev/react-native-blur)
2. [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)
3. [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) - need v1
4. [react-native-uuid](https://github.com/eugenehp/react-native-uuid)
5. [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics)


### Usage

In root Component

```
import { NotificationProvider } from "@alexzunik/rn-awesome-notifications";

<NotificationProvider>
  ...
</NotificationProvider>
```

In your Component

```
import { useNotify } from "@alexzunik/rn-awesome-notifications";

const MyComponent: React.FC = () => {
  
  const notify = useNotify();
  
  return (
    <Button
      title="Without buttons and icon"
      onPress={() => {
        notify({
          title: "Test push notification",
          message: "This is push was recievd from local storage",
          theme: "light"
        })
      }}
    />
  )
}
```
