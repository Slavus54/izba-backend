const app = require('express')()
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT || 4000

// schemas

const Profiles = require('./schemas/Profiles') 
const Projects = require('./schemas/Projects') 
const Events = require('./schemas/Events') 
const Companies = require('./schemas/Companies') 
const Tools = require('./schemas/Tools') 

// microservices

const {middleware, mongo_connect, apollo_start, slicer, get_id} = require('./libs/microservices')

// database url

const url = 'mongodb+srv://Slavus54:ieOUiW5CNwW5gQ5D@web-2024.v43n3ay.mongodb.net/Izba-IO'

// middlewares

middleware(app)
mongo_connect(url, 'MongoDB is connected...')

const typeDefs = gql`
    type Query {
        test: String!
    }
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        username: String!
    }
    type AccountComponent {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Work {
        shortid: String!,
        text: String!,
        category: String!,
        level: String!,
        photo_url: String!,
        dateUp: String!,
        likes: Float!
    }
    type Paper {
        shortid: String!,
        title: String!,
        category: String!,
        status: String!,
        photo_url: String!,
        likes: Float!
    }
    type Question {
        shortid: String!,
        name: String!,
        text: String!,
        format: String!,
        level: String!,
        answer: String!,
        accepted: Boolean!
    }
    type ProjectEvent {
        shortid: String!,
        title: String!,
        dateUp: String!,
        time: String!
    }
    type Step {
        id: String!,
        text: String!,
        role: String!,
        priority: Float!
    }
    input StepInp {
        id: String!,
        text: String!,
        role: String!,
        priority: Float!
    }
    type Member {
        username: String!,
        telegram_tag: String!,
        role: String!
    }
    type Result {
        shortid: String!,
        name: String!,
        text: String!,
        rate: Float!,
        photo_url: String!,
        likes: Float!
    }
    type Coupon {
        id: String!,
        architecture: String!,
        percent: Float!
    }
    input CouponInp {
        id: String!,
        architecture: String!,
        percent: Float!
    }
    type House {
        shortid: String!,
        title: String!,
        category: String!,
        architecture: String!,
        photo_url: String!,
        cords: Cord!,
        likes: Float!
    }
    type Review {
        shortid: String!,
        name: String!,
        text: String!,
        criterion: String!,
        period: String!,
        rating: Float!
    }
    type Offer {
        shortid: String!,
        name: String!,
        marketplace: String!,
        cost: Float!,
        cords: Cord!,
        likes: Float!
    }
    type Tool {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        description: String!,
        category: String!,
        format: String!,
        electric: Boolean!,
        url: String!,
        main_photo: String!,
        reviews: [Review]!,
        offers: [Offer]!
    }
    type Company {
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        format: String!,
        base: Float!,
        coupons: [Coupon]!,
        region: String!,
        cords: Cord!,
        houses: [House]!
    }
    type Event {
        id: ID!,
        shortid: String!,
        project_id: String!,
        username: String!,
        title: String!,
        category: String!,
        level: String!,
        steps: [Step]!,
        volume: Float!,
        dateUp: String!,
        time: String!,
        done: Boolean!,
        members: [Member]!,
        results: [Result]!
    }
    type Project {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        architecture: String!,
        century: String!,
        region: String!,
        cords: Cord!,
        card_number: String!,
        total: Float!,
        papers: [Paper]!,
        questions: [Question]!,
        events: [ProjectEvent]!
    }
    type Profile {
        account_id: String!,
        username: String!,
        security_code: String!,
        telegram_tag: String!,
        architecture: String!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        works: [Work]!,
        account_components: [AccountComponent]!
    }
    type Mutation {
        register(username: String!, security_code: String!, telegram_tag: String!, architecture: String!, region: String!, cords: ICord!, main_photo: String!) : UserCookie!
        login(security_code: String!) : UserCookie!
        getProfiles(username: String!) : [Profile]!
        getProfile(account_id: String!) : Profile
        updateProfilePersonalInfo(account_id: String!, architecture: String!, main_photo: String!) : String!
        updateProfileGeoInfo(account_id: String!, region: String!, cords: ICord!) : String!
        updateProfileSecurityCode(account_id: String!, security_code: String!) : String!
        manageProfileWork(account_id: String!, option: String!, text: String!, category: String!, level: String!, photo_url: String!, dateUp: String!, coll_id: String!) : String!
        createProject(username: String!, id: String!, title: String!, category: String!, architecture: String!, century: String!, region: String!, cords: ICord!, card_number: String!, total: Float!) : String!
        getProjects(username: String!) : [Project]!
        getProject(username: String!, shortid: String!) : Project!
        manageProjectPaper(username: String!, id: String!, option: String!, title: String!, category: String!, status: String!, photo_url: String!, coll_id: String!) : String!
        updateProjectBudget(username: String!, id: String!, total: Float!) : String!
        manageProjectQuestion(username: String!, id: String!, option: String!, text: String!, format: String!, level: String!, coll_id: String!, answer: String!) : String!
        createEvent(username: String!, id: String!, title: String!, category: String!, level: String!, steps: [StepInp]!, volume: Float!, dateUp: String!, time: String!) : String!
        getEvent(username: String!, shortid: String!) : Event! 
        manageEventStatus(username: String!, id: String!, option: String!, role: String!) : String!
        manageEventResult(username: String!, id: String!, option: String!, text: String!, rate: Float!, photo_url: String!, coll_id: String!) : String!
        makeEventDone(username: String!, id: String!, project_id: String!) : String!
        createCompany(username: String!, id: String!, title: String!, category: String!, format: String!, base: Float!, coupons: [CouponInp]!, region: String!, cords: ICord!) : String!
        getCompanies(username: String!) : [Company]!
        getCompany(username: String!, shortid: String!) : Company!
        updateCompanyBase(username: String!, id: String!, base: Float!) : String!
        manageCompanyHouse(username: String!, id: String!, option: String!, title: String!, category: String!, architecture: String!, photo_url: String!, cords: ICord!, coll_id: String!) : String!
        createTool(username: String!, id: String!, title: String!, description: String!, category: String!, format: String!, electric: Boolean!, url: String!, main_photo: String!) : String!
        getTools(username: String!) : [Tool]!
        getTool(username: String!, shortid: String!) : Tool!
        makeToolReview(username: String!, id: String!, text: String!, criterion: String!, period: String!, rating: Float!) : String!
        updateToolInfo(username: String!, id: String!, url: String!, main_photo: String!) : String!
        manageToolOffer(username: String!, id: String!, option: String!, marketplace: String!, cost: Float!, cords: ICord!, coll_id: String!) : String!
    }
`

const resolvers = {
    Query: {
        test: () => 'Hi'
    },
    Mutation: {
        register: async (_, {username, security_code, telegram_tag, architecture, region, cords, main_photo}) => {
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username}

            if (profile === null) {

                let account_id = get_id()

                const newProfile = new Profiles({
                    account_id,
                    username,
                    security_code,
                    telegram_tag,
                    architecture,
                    region,
                    cords,
                    main_photo,
                    works: [],
                    account_components: []
                })

                drop_object = {account_id, username}
                
                await newProfile.save()
            } 
        
            return drop_object
        },
        login: async (_, {security_code}) => {
            const profile = await Profiles.findOne({security_code}) 
            let drop_object = {account_id: '', username: ''}
           
            if (profile) {  
                drop_object = {account_id: profile.account_id, username: profile.username}                       
            }

            return drop_object
        },
        getProfiles: async (_, {username}) => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfilePersonalInfo: async (_, {account_id, architecture, main_photo}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
        
                profile.architecture = architecture
                profile.main_photo = main_photo

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        updateProfileGeoInfo: async (_, {account_id, region, cords}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.region = region
                profile.cords = cords
             
                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        updateProfileSecurityCode: async (_, {account_id, security_code}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.security_code = security_code

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        manageProfileWork: async (_, {account_id, option, text, category, level, photo_url, dateUp, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {

                    let shortid = get_id()

                    profile.works = [...profile.works, {
                        shortid,
                        text,
                        category,
                        level,
                        photo_url,
                        dateUp,
                        likes: 0
                    }]

                    profile.works = slicer(profile.works, 20)

                } else if (option === 'delete') {

                    profile.works = profile.works.filter(el => el.shortid !== coll_id)

                } else {

                    profile.works.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'like') {
                                el.likes += 1
                            } else if (option === 'update') {
                                el.photo_url = photo_url
                            }
                        }
                    })
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        createProject: async (_, {username, id, title, category, architecture, century, region, cords, card_number, total}) => {
            const profile = await Profiles.findOne({username, account_id: id}) 
            const project = await Projects.findOne({username, title, category, architecture, century, region, cords, card_number})
        
            if (profile && !project) {
                if (profile.account_components.filter(el => el.path === 'project').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'project'
                    }]

                    const newProject = new Projects({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        architecture,
                        century,
                        region,
                        cords,
                        card_number,
                        total,
                        papers: [],
                        questions: [],
                        events: []
                    })  

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newProject.save()

                    return 'Success'
                }
            }
        
            return 'Error'
        },
        getProjects: async (_, {username}) => {
            const projects = await Projects.find()

            return projects
        },
        getProject: async (_, {username, shortid}) => {
            const project = await Projects.findOne({shortid})

            return project
        },
        manageProjectPaper: async (_, {username, id, option, title, category, status, photo_url, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const project = await Projects.findOne({shortid: id})
        
            if (profile && project) {
                if (option === 'create') {

                    let shortid = get_id()

                    project.papers = [...project.papers, {
                        shortid,
                        title,
                        category,
                        status,
                        photo_url,
                        likes: 0
                    }]

                    project.papers = slicer(project.papers, 20)

                } else if (option === 'delete') {

                    project.papers = project.papers.filter(el => el.shortid !== coll_id)

                } else {

                    project.papers.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'update') {
                                el.status = status
                                el.photo_url = photo_url
                            } else if (option === 'like') {
                                el.likes += 1
                            }
                        }
                    })
                }

                await Projects.updateOne({shortid: id}, {$set: project})

                return 'Success'
            }

            return 'Error'
        },
        updateProjectBudget: async (_, {username, id, total}) => {
            const profile = await Profiles.findOne({username})
            const project = await Projects.findOne({shortid: id})
        
            if (profile && project) {

                project.total = total

                await Projects.updateOne({shortid: id}, {$set: project})

                return 'Success'
            }

            return 'Error'
        },
        manageProjectQuestion: async (_, {username, id, option, text, format, level, coll_id, answer}) => {
            const profile = await Profiles.findOne({username})
            const project = await Projects.findOne({shortid: id})
        
            if (profile && project) {
                if (option === 'create') {

                    let shortid = get_id()

                    project.questions = [...project.questions, {
                        shortid,
                        name: profile.username,
                        text,
                        format,
                        level,
                        answer: '',
                        accepted: false
                    }]

                    project.questions = slicer(project.questions, 20)

                } else if (option === 'answer') {

                    project.questions.map(el => {
                        if (el.shortid === coll_id) {
                            el.answer = answer
                            el.accepted = true
                        }
                    })

                } else {

                    project.questions = project.questions.filter(el => el.shortid !== coll_id)
                }

                await Projects.updateOne({shortid: id}, {$set: project})

                return 'Success'
            }

            return 'Error'
        },
        createEvent: async (_, {username, id, title, category, level, steps, volume, dateUp, time}) => {
            const profile = await Profiles.findOne({username})
            const project = await Projects.findOne({shortid: id})
            const event = await Events.findOne({title, category, level, steps, volume, dateUp, time})
        
            if (profile && project && !event) {
                if (profile.account_components.filter(el => el.path === 'event').find(el => el.title === title) === undefined) {
                    
                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'event'
                    }]

                    project.events = [...project.events, {
                        shortid,
                        title,
                        dateUp,
                        time
                    }]

                    const newEvent = new Events({
                        shortid,
                        project_id: id,
                        username: profile.username,
                        title,
                        category,
                        level,
                        steps,
                        volume,
                        dateUp,
                        time,
                        done: false,
                        members: [{
                            username: profile.username,
                            telegram_tag: profile.telegram_tag,
                            role: 'creator'
                        }],
                        results: []
                    })
                
                    await Profiles.updateOne({username}, {$set: profile})
                    await Projects.updateOne({shortid: id}, {$set: project})
                    await newEvent.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getEvent: async (_, {username, shortid}) => {
            const event = await Events.findOne({shortid})

            return event
        },
        manageEventStatus: async (_, {username, id, option, role}) => {
            const profile = await Profiles.findOne({username})
            const event = await Events.findOne({shortid: id})
       
            if (profile && event) {
                if (option === 'join') {
                     
                    profile.account_components = [...profile.account_components, {
                        shortid: event.shortid,
                        title: event.title,
                        path: 'event'
                    }]

                    event.members = [...event.members, {
                        username: profile.username,
                        telegram_tag: profile.telegram_tag,
                        role
                    }]

                } else if (option === 'update') {

                    event.members.map(el => {
                        if (el.username === profile.username) {
                            el.role = role
                        }
                    })

                } else {
                    
                    profile.account_components = profile.account_components.filter(el => el.shortid !== event.shortid)

                    event.members = event.members.filter(el => el.username !== profile.username)
                }

                await Profiles.updateOne({username}, {$set: profile})
                await Events.updateOne({shortid: id}, {$set: event})

                return 'Success'
            }

            return 'Error'
        },
        manageEventResult: async (_, {username, id, option, text, rate, photo_url, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const event = await Events.findOne({shortid: id})
       
            if (profile && event) {
                if (option === 'create') {

                    let shortid = get_id()
                    
                    event.results = [...event.results, {
                        shortid,
                        name: profile.username,
                        text,
                        rate,
                        photo_url,
                        likes: 0
                    }]

                    event.results = slicer(event.results, 20)

                } else if (option === 'like') {

                    event.results.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    event.results = event.results.filter(el => el.shortid !== coll_id)
                }

                await Events.updateOne({shortid: id}, {$set: event})

                return 'Success'
            }

            return 'Error'
        },
        makeEventDone: async (_, {username, id, project_id}) => {
            const profile = await Profiles.findOne({username})
            const event = await Events.findOne({shortid: id})
            const project = await Projects.findOne({shortid: project_id})

            if (profile && event && project) {

                event.done = true

                project.total -= event.volume
                project.events = project.events.filter(el => el.shortid !== event.shortid)
             
                await Projects.updateOne({shortid: project_id}, {$set: project})
                await Events.updateOne({shortid: id}, {$set: event})

                return 'Success'
            }

            return 'Error'
        },
        createCompany: async (_, {username, id, title, category, format, base, coupons, region, cords}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const company = await Companies.findOne({username, title, category, format, base, cords})

            if (profile && !company) {
                if (profile.account_components.filter(el => el.path === 'company').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'company'
                    }]

                    const newCompany = new Companies({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        format,
                        base,
                        coupons,
                        region,
                        cords,
                        houses: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newCompany.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getCompanies: async (_, {username}) => {
            const companies = await Companies.find()

            return companies
        },
        getCompany: async (_, {username, shortid}) => {
            const company = await Companies.findOne({shortid})

            return company
        },
        updateCompanyBase: async (_, {username, id, base}) => {
            const profile = await Profiles.findOne({username})
            const company = await Companies.findOne({shortid: id})
        
            if (profile && company) {

                company.base = base

                await Companies.updateOne({shortid: id}, {$set: company})

                return 'Success'
            }

            return 'Error'
        },
        manageCompanyHouse: async (_, {username, id, option, title, category, architecture, photo_url, cords, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const company = await Companies.findOne({shortid: id})
        
            if (profile && company) {
                if (option === 'create') {

                    let shortid = get_id()

                    company.houses = [...company.houses, {
                        shortid,
                        title,
                        category,
                        architecture,
                        photo_url,
                        cords,
                        likes: 0
                    }]

                    company.houses = slicer(company.houses, 20)

                } else if (option === 'like') {

                    company.houses.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    company.houses = company.houses.filter(el => el.shortid !== coll_id)
                }

                await Companies.updateOne({shortid: id}, {$set: company})

                return 'Success'
            }

            return 'Error'
        },
        createTool: async (_, {username, id, title, description, category, format, electric, url, main_photo}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const tool = await Tools.findOne({username, title, description, category, format})

            if (profile && !tool) {
                if (profile.account_components.filter(el => el.path === 'tool').find(el => el.title === title) === undefined) {
                   
                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'tool'
                    }]

                    const newTool = new Tools({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        description,
                        category,
                        format,
                        electric,
                        url,
                        main_photo,
                        reviews: [],
                        offers: []
                    })
                
                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newTool.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getTools: async (_, {username}) => {
            const tool = await Tools.find()

            return tool
        },
        getTool: async (_, {username, shortid}) => {
            const tool = await Tools.findOne({shortid})

            return tool
        },
        makeToolReview: async (_, {username, id, text, criterion, period, rating}) => {
            const profile = await Profiles.findOne({username})
            const tool = await Tools.findOne({shortid: id})
        
            if (profile && tool) {
                
                let shortid = get_id()

                tool.reviews = [...tool.reviews, {
                    shortid,
                    name: profile.username,
                    text,
                    criterion,
                    period,
                    rating
                }]

                tool.reviews = slicer(tool.reviews, 20)
            
                await Tools.updateOne({shortid: id}, {$set: tool})

                return 'Success'
            }
        
            return 'Error'
        },
        updateToolInfo: async (_, {username, id, url, main_photo}) => {
            const profile = await Profiles.findOne({username})
            const tool = await Tools.findOne({shortid: id})
        
            if (profile && tool) {

                tool.url = url
                tool.main_photo = main_photo

                await Tools.updateOne({shortid: id}, {$set: tool})

                return 'Success'
            }
        
            return 'Error'
        },
        manageToolOffer: async (_, {username, id, option, marketplace, cost, cords, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const tool = await Tools.findOne({shortid: id})
        
            if (profile && tool) {
                if (option === 'create') {

                    let shortid = get_id()

                    tool.offers = [...tool.offers, {
                        shortid,
                        name: profile.username,
                        marketplace,
                        cost,
                        cords,
                        likes: 0
                    }]

                    tool.offers = slicer(tool.offers, 20)

                } else if (option === 'like') {

                    tool.offers.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        } 
                    })

                } else {

                    tool.offers = tool.offers.filter(el => el.shortid !== coll_id)
                }

                await Tools.updateOne({shortid: id}, {$set: tool})

                return 'Success'
            }
        
            return 'Error'
        }



    }
}

apollo_start(typeDefs, resolvers, app)

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))