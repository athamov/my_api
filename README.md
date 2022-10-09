# my_api


### add Authorization header to graphql

### graphql codes
```
    mutation($password: String!, $email: String, $username: String){
    login(password: $password,email: $email,username: $username) {
      jwt
    }
  }

  query($username: String!){
    getUser(username: $username) {
      email
    }
  }

  query($model: String!,$skip:Int,$limit:Int){
    getCar(Model: $model) {
      year
    }
    getCars(skip:$skip,limit: $limit) {
      Model
    }
  }

  mutation($Id:ID,$Model: String,$Brand: String,$year:Int,$Prize: String,$Vint:String,$color:String,$Sale:Boolean) {
    CreateCar (Id:$Id,Model:$Model,Brand:$Brand,year:$year,Prize:$Prize,Vint:$Vint,color:$color,Sale:$Sale) {
      Model
    }
  }

  mutation($Id:ID,$Model: String,$Brand: String,$year:Int,$Prize: String,$Vint:String,$color:String,$Sale:Boolean) {
    update(Id:$Id,Model:$Model,Brand:$Brand,year:$year,Prize:$Prize,Vint:$Vint,color:$color,Sale:$Sale) {
      Model
    }
  }

  mutation($model: String!){
    delete(Model: $model) 
  }
```

### graphql variables
```
  {
    "email": "teste@test.com",
    "username": "null",
    "password": "12345678",
    "Model": "Tahoe",
    "Brand":"Chevrolet",
    "color":"Red",
    "Prize":"20002",
    "Id":"10001",
    "Sale":true,
    "Vint":"WVGAK7A98AD43427",
    "year":2005,
    "skip":10,
    "limit": 10,
    "model": "Tahoe",
  }
```
