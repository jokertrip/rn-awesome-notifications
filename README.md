### Description



### Installation

```sh
npm i --save rn-awesome-notifications
```



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
        })
      }}
    />
  )
}
```
