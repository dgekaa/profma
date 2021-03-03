import gql from 'graphql-tag';

export const ALL_CITIES = gql`
  query {
    cities {
      data {
        id
        name
      }
    }
  }
`;

export const LOAD_IMAGE = gql`
  mutation LOADIMAGE($file: Upload!, $type: UserType!) {
    uploadAppointmentPhoto(file: $file, type: $type)
  }
`;

export const REGISTER = gql`
  mutation REGISTER(
    $type: UserType!
    $email: String!
    $password: String!
    $password_confirmation: String!
  ) {
    register(
      input: {
        type: $type
        email: $email
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status
      tokens {
        access_token
        refresh_token
        expires_in
        token_type
        user {
          id
          email
          profile {
            id
            city {
              id
              name
            }
            name
            email
            mobile_phone
            addition_phone
            home_address
            work_address
            about_me
          }
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation LOGIN($username: String!, $password: String!) {
    login(input: {username: $username, password: $password}) {
      user {
        id
        email
        type

        profile {
          id
          city {
            id
            name
          }
          name
          email
          mobile_phone
          addition_phone
          home_address
          work_address
          about_me
        }
      }
      access_token
      refresh_token
    }
  }
`;

export const GET_APPOINTMENT = gql`
  query GETAPPOINTMENT($id: ID!) {
    appointment(id: $id) {
      id
      client {
        profile {
          id
          email
          name
        }
      }
      master {
        email
      }
      offers {
        id
        service {
          id
          name
          specialization {
            id
            name
          }
        }
        description
        price_by_pack {
          price
          duration
        }
      }
      date
      time
      comment
      status
    }
  }
`;

export const UPDATE_PROFILE_WITHOUT_CITY = gql`
  mutation UPDATEPROFILE(
    $id: ID!
    $name: String
    $email: String
    $mobile_phone: String
    $addition_phone: String
    $home_address: String
    $work_address: String
    $site: String
    $about_me: String
  ) {
    updateProfile(
      input: {
        id: $id
        name: $name
        email: $email
        mobile_phone: $mobile_phone
        addition_phone: $addition_phone
        home_address: $home_address
        work_address: $work_address
        site: $site
        about_me: $about_me
      }
    ) {
      id
      name
      email
      mobile_phone
      addition_phone
      home_address
      work_address
      site
      about_me
      city {
        id
        name
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UPDATEPROFILE(
    $id: ID!
    $name: String
    $email: String
    $mobile_phone: String
    $addition_phone: String
    $home_address: String
    $work_address: String
    $site: String
    $about_me: String
    $city_id: ID!
  ) {
    updateProfile(
      input: {
        id: $id
        name: $name
        email: $email
        mobile_phone: $mobile_phone
        addition_phone: $addition_phone
        home_address: $home_address
        work_address: $work_address
        site: $site
        about_me: $about_me
        city: {connect: $city_id}
      }
    ) {
      id
      name
      email
      mobile_phone
      addition_phone
      home_address
      work_address
      site
      about_me
      city {
        id
        name
      }
    }
  }
`;

export const CREATE_PROFILE = gql`
  mutation CREATEPROFILE(
    $name: String
    $email: String
    $mobile_phone: String
    $addition_phone: String
    $home_address: String
    $work_address: String
    $site: String
    $about_me: String
  ) {
    createProfile(
      input: {
        name: $name
        email: $email
        mobile_phone: $mobile_phone
        addition_phone: $addition_phone
        home_address: $home_address
        work_address: $work_address
        site: $site
        about_me: $about_me
      }
    ) {
      id
      name
      email
      mobile_phone
      addition_phone
      home_address
      work_address
      site
      about_me
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CREATEAPPOINTMENT(
    $id: ID!
    $date: String!
    $time: String!
    $offers_id: [ID!]
  ) {
    createAppointment(
      input: {
        master: {connect: $id}
        date: $date
        time: $time
        offers: {connect: $offers_id}
      }
    ) {
      id
      date
      time
      offers {
        id
        user {
          id
          email
        }
      }
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation UPDATEAPPOINTMENT($id: ID!, $status: AppointmentStatus) {
    updateAppointment(input: {id: $id, status: $status}) {
      id
      status
      date
      time
    }
  }
`;

export const UPDATE_APPOINTMENT_ADD_OFFERS = gql`
  mutation UPDATEAPPOINTMENTADDOFFERS($id: ID!, $offersid: [ID!]) {
    updateAppointment(input: {id: $id, offers: {connect: $offersid}}) {
      id
      status
      date
      time
      offers {
        id
      }
    }
  }
`;

export const UPDATE_APPOINTMENT_ADD_PHOTO = gql`
  mutation UPDATEAPPOINTMENTADDPHOTO($id: ID!, $src: String!) {
    updateAppointment(input: {id: $id, photos: {create: {src: $src}}}) {
      id
      date
      comment
      time
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation DELETEAPPOINTMENT($id: ID!) {
    deleteAppointment(input: {id: $id}) {
      id
      status
    }
  }
`;

export const LOGOUT = gql`
  mutation LOGOUT {
    logout {
      status
      message
    }
  }
`;

export const GET_SPECIALIZATIONS = gql`
  query GETSPECIALIZATIONS($first: Int) {
    specializations(first: $first) {
      data {
        id
        name
        services {
          id
          name
        }
      }
    }
  }
`;

export const GET_SPECIALIZATION = gql`
  query GETSPECIALIZATION($id: ID) {
    specialization(id: $id) {
      id
      name
      services {
        id
        name
      }
    }
  }
`;

export const GET_SERVICES = gql`
  query GETSERVICES($ids: [Int!], $first: Int, $page: Int) {
    services(ids: $ids, first: $first, page: $page) {
      data {
        id
        name
        specialization {
          id
          name
        }
      }
    }
  }
`;

// export const CREATE_OFFER = gql`
//   mutation CREATEOFFER(
//     $service: CreateServiceToOne!
//     $description: String!
//     $price_by_pack: CreateOfferPriceByPackToOne!
//   ) {
//     createOffer(
//       input: {
//         service: $service
//         description: $description
//         price_by_pack: $price_by_pack
//       }
//     ) {
//       id
//       service {
//         id
//         name
//       }
//     }
//   }
// `;
export const CREATE_OFFER = gql`
  mutation CREATEOFFER(
    $id: ID
    $description: String!
    $duration: Float!
    $price: Float!
  ) {
    createOffer(
      input: {
        service: {connect: $id}
        description: $description
        price_by_pack: {create: {duration: $duration, price: $price}}
      }
    ) {
      id
      description
      service {
        id
        name
      }
    }
  }
`;

export const DELETE_OFFER = gql`
  mutation DELETEOFFER($id: ID!) {
    deleteOffer(input: {id: $id}) {
      id
    }
  }
`;

export const ME = gql`
  query ME {
    me {
      id
      email
      type
      client_appointments {
        id
        master {
          id
          email
          profile {
            id
            name
            work_address
          }
        }
        date
        time
        comment
        status
        offers {
          service {
            name
          }
          price_by_pack {
            duration
            price
          }
        }
      }
      master_appointments {
        id
        photos {
          id
          src
        }
        client {
          id
          email
          profile {
            id
            name
            home_address
            work_address
            mobile_phone
          }
        }
        date
        time
        comment
        status
        offers {
          service {
            name
          }
          price_by_pack {
            duration
            price
          }
        }
      }
      offers {
        id
        description
        service {
          name
          id
          specialization {
            name
          }
        }
        price_by_pack {
          duration
          price
        }
      }

      schedules {
        id
        day
        start_time
        end_time
        start_sessions {
          id
          time
        }
      }
      profile {
        id
        name
        email
        mobile_phone
        addition_phone
        home_address
        work_address
        about_me
        site
        city {
          id
          name
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query GETUSERS($first: Int, $type: UserType) {
    users(first: $first, type: $type) {
      data {
        id
        email
        type
        master_appointments {
          id
          photos {
            id
            src
          }
        }
        profile {
          id
          name
          email
          mobile_phone
          addition_phone
          home_address
          work_address
          about_me
          site
        }

        schedules {
          id
          day
          start_time
          end_time
          start_sessions {
            id
            time
          }
        }
        offers {
          price_by_pack {
            id
            duration
            price
          }
        }
      }
      paginatorInfo {
        count
        currentPage
      }
    }
  }
`;
export const GET_APPOINTMENTS = gql`
  query GETAPPOINTMENTS($first: Int) {
    appointments(first: $first) {
      data {
        id
        photos {
          id
          src
        }
      }
      paginatorInfo {
        count
        currentPage
      }
    }
  }
`;

export const GET_USER = gql`
  query GETUSER($id: ID!) {
    user(id: $id) {
      id
      profile {
        id
        name
        email
        mobile_phone
        addition_phone
        home_address
        work_address
        about_me
        site
        city {
          name
          id
        }
      }
      master_appointments {
        id
        photos {
          id
          src
        }
      }
      schedules {
        id
        day
        start_time
        end_time
        start_sessions {
          id
          time
        }
      }
      offers {
        id
        description
        service {
          id
          name
          specialization {
            id
            name
          }
        }
        price_by_pack {
          id
          duration
          price
        }
      }
    }
  }
`;

export const CREATE_SCHEDULE = gql`
  mutation CREATESCHEDULE(
    $day: WeekDay!
    $start_time: String!
    $end_time: String!
    $start_sessions: CreateStartSesionHasMany
  ) {
    createSchedule(
      input: {
        day: $day
        start_time: $start_time
        end_time: $end_time
        start_sessions: $start_sessions
      }
    ) {
      id
      day
      start_time
      end_time
    }
  }
`;

export const UPDATE_SCHEDULE_WORK_TIME = gql`
  mutation UPDATESCHEDULE(
    $id: ID!
    $day: WeekDay
    $start_time: String
    $end_time: String
  ) {
    updateSchedule(
      input: {id: $id, day: $day, start_time: $start_time, end_time: $end_time}
    ) {
      id
      day
      start_time
      end_time
    }
  }
`;

export const UPDATE_SCHEDULE = gql`
  mutation UPDATESCHEDULE(
    $id: ID!
    $day: WeekDay
    $start_time: String
    $end_time: String
    $time: String!
  ) {
    updateSchedule(
      input: {
        id: $id
        day: $day
        start_time: $start_time
        end_time: $end_time
        start_sessions: {create: {time: $time}}
      }
    ) {
      id
      day
      start_time
      end_time
    }
  }
`;

export const DELETE_SCHEDULE = gql`
  mutation DELETESCHEDULE($id: ID!) {
    deleteSchedule(input: {id: $id}) {
      id
      day
      start_time
      end_time
    }
  }
`;

export const GET_SCHEDULE = gql`
  query GETSCHEDULE($id: ID) {
    schedule(id: $id) {
      id
      start_time
      end_time
      start_sessions {
        id
        time
      }
    }
  }
`;

export const DELETE_START_SESSION = gql`
  mutation DELETESTARTSESSION($id: ID!) {
    deleteStartSession(input: {id: $id}) {
      id
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UPDATEPASSWORD($password: String!, $password_confirmation: String!) {
    updatePassword(
      input: {
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status
      message
    }
  }
`;

export const FIND_MASTER = gql`
  query FINDMASTER($city_id: Int!, $dates: [String!]!) {
    findMaster(city_id: $city_id, dates: $dates) {
      user {
        id
        profile {
          id
          email
          name
          work_address
        }
        offers {
          price_by_pack {
            duration
            price
          }
        }
      }
      dates {
        date
        times
      }
    }
  }
`;

export const NEXT_APPOINTMENTS = gql`
  query NEXTAPPOINTMENTS($count: Int) {
    nextAppointments(count: $count) {
      id
      date
      time
      comment
      status
      client {
        id
        type
        profile {
          id
          city {
            id
            name
          }
          name
          email
        }
      }
      offers {
        id
        price_by_pack {
          price
          duration
        }
        service {
          id
          name
        }
      }
      master {
        id
        type
        offers {
          id
          service {
            id
            name
            specialization {
              id
              name
            }
          }
          description
          price_by_pack {
            price
            duration
          }
        }
        profile {
          id
          city {
            id
            name
          }

          name
          email
        }
      }
    }
  }
`;

export const FREE_TIME = gql`
  query FREETIME($master_id: Int!, $dates: [String!]!) {
    freeTimeByMaster(master_id: $master_id, dates: $dates) {
      date
      times
    }
  }
`;

export const NEXT_FREE_TIME_BY_MASTER = gql`
  query NEXTFREETIMEBYMASTER($master_id: Int!, $count: Int) {
    nextFreeTimeByMaster(master_id: $master_id, count: $count) {
      date
      times
    }
  }
`;

// export const FORGOT_PASSWORD = gql`
//   mutation FORGOTPASSWORD($email: String!) {
//     forgotPasswordApp(input: {email: $email}) {
//       message
//       status
//   }
// `;
