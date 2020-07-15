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

export const GET_USERS = gql`
  query GETUSERS($first: Int, $type: UserType) {
    users(first: $first, type: $type) {
      data {
        id
        email
        type
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

export const CREATE_OFFER = gql`
  mutation CREATEOFFER(
    $service: CreateServiceToOne!
    $description: String!
    $price_by_pack: CreateOfferPriceByPackToOne!
  ) {
    createOffer(
      input: {
        service: $service
        description: $description
        price_by_pack: $price_by_pack
      }
    ) {
      id
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
        client {
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
