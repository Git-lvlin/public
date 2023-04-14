const topicArr=[
    {
        title:'什么是AED?',
        topic_option:[ //选项
           {
            name:'A：自动体外除颤器',
            status:''
           },
           {
            name:'B：游戏机',
            status:''
           },
           {
            name:'C：自动按摩椅',
            status:''
           },
           {
            name:'D：一种食物',
            status:''
           }
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1正确，0未回答
        right_answers: [0], //正确答案 0:A 1:B 2:C 3:D
        current_selection: [] //当前选择状态
    },
    {
        title:'AED适合什么样的人群使用？',
        topic_option:[ //选项
           {
            name:'A：专业医护人员 ',
            status:''
           },
           {
            name:'B：儿童',
            status:''
           },
           {
            name:'C：适合普通公众人员',
            status:''
           },
           {
            name:'D：盲人',
            status:''
           }
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1正确，0未回答
        right_answers: [2], 
        current_selection: [] //当前选择状态
    },
    {
        title:'下列不属于创业行为的是？',
        topic_option:[ //选项
           {
            name:'A：注册个体工商户',
            status:''
           },
           {
            name:'B：注册有限责任公司',
            status:''
           },
           {
            name:'C：注册集团公司',
            status:''
           },
           {
            name:'D：注册学籍',
            status:''
           }
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1正确，0未回答
        right_answers: [3], 
        current_selection: [] //当前选择状态
    },
    {
        title:'下列属于商业计划书范围的是？',
        topic_option:[ //选项
           {
            name:'A：家庭成员',
            status:''
           },
           {
            name:'B：创始人发型',
            status:''
           },
           {
            name:'C：市场前景',
            status:''
           },
           {
            name:'D：婚姻状况',
            status:''
           }
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1正确，0未回答
        right_answers: [2], 
        current_selection: [] //当前选择状态
    },
    {
        title:'下列属于就业重点的选项是?',
        topic_option:[ //选项
           {
            name:'A：职业生涯规划',
            status:''
           },
           {
            name:'B：买房',
            status:''
           },
           {
            name:'C：结婚',
            status:''
           },
           {
            name:'D：买名牌服装',
            status:''
           }
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1正确，0未回答
        right_answers: [0], 
        current_selection: [] //当前选择状态
    },
    {
        title:'下列能参与应急救援志愿者的人员是？',
        topic_option:[ //
           {
            name:'A：18-55岁的健康男性',
            status:''
           },
           {
            name:'B：18-55岁的健康女性',
            status:''
           },
           {
            name:'C：残疾人 ',
            status:''
           },
           {
            name:'D：儿童',
            status:''
           }
        ],
        type: 2,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1已回答，0未回答
        right_answers: [0,1], //正确答案 0:A 1:B 2:C 3:D
        current_selection: [] //当前选择状态
    },
    {
        title:'关于AED说法正确的是？',
        topic_option:[ //
           {
            name:'A：自动体外除颤器',
            status:''
           },
           {
            name:'B：非医护人员也可使用',
            status:''
           },
           {
            name:'C：用于抢救心脏骤停患者',
            status:''
           },
           {
            name:'D：医生才能用',
            status:''
           }
        ],
        type: 2,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1已回答，0未回答
        right_answers: [0,1,2], //正确答案 0:A 1:B 2:C 3:D
        current_selection: [] //当前选择状态
    },
    {
        title:'关于心肺复苏说法正确的是？',
        topic_option:[ //
           {
            name:'A：确认呼吸的时间是5-10秒 ',
            status:''
           },
           {
            name:'B：救援过程中不用拨打120',
            status:''
           },
           {
            name:'C：无法确认呼吸时开始胸外按压',
            status:''
           },
           {
            name:'D：确认无意识就直接做人工呼吸',
            status:''
           }
        ],
        type: 2,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1已回答，0未回答
        right_answers: [0,1,2], //正确答案 0:A 1:B 2:C 3:D
        current_selection: [] //当前选择状态
    },
    {
        title:'下列属于公司风险管理内容的是？',
        topic_option:[ //
           {
            name:'A：合同管理',
            status:''
           },
           {
            name:'B：商标管理',
            status:''
           },
           {
            name:'C：版权管理',
            status:''
           },
           {
            name:'D：专利管理',
            status:''
           }
        ],
        type: 2,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1已回答，0未回答
        right_answers: [0,1,2,3], //正确答案 0:A 1:B 2:C 3:D
        current_selection: [] //当前选择状态
    },
    {
        title:'下列属于公司管理范围的是？',
        topic_option:[ //
           {
            name:'A：组织',
            status:''
           },
           {
            name:'B：财务',
            status:''
           },
           {
            name:'C：生产',
            status:''
           },
           {
            name:'D：品牌',
            status:''
           }
        ],
        type: 2,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1已回答，0未回答
        right_answers: [0,1,2,3], //正确答案 0:A 1:B 2:C 3:D
        current_selection: [] //当前选择状态
    },
    {
        title:'普通公众也可以使用AED自动体外除颤器',
        topic_option:[ //
           {
            name:'对',
            status:''
           },
           {
            name:'错',
            status:''
           },
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1已回答，0未回答
        right_answers: [0],
        current_selection: [] //当前选择状态
    },
    {
        title:'心肺复苏过程中，无法确认呼吸时，先做胸外按压，再做人工呼吸',
        topic_option:[ //
           {
            name:'对',
            status:''
           },
           {
            name:'错',
            status:''
           },
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1已回答，0未回答
        right_answers: [0],
        current_selection: [] //当前选择状态
    },
    {
        title:'产品定价不属于营销策略的范畴',
        topic_option:[ //
           {
            name:'对',
            status:''
           },
           {
            name:'错',
            status:''
           },
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1已回答，0未回答
        right_answers: [1],
        current_selection: [] //当前选择状态
    },
    {
        title:'就业过程中，选择行业不属于职业生涯规划的内容',
        topic_option:[ //
           {
            name:'对',
            status:''
           },
           {
            name:'错',
            status:''
           },
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1已回答，0未回答
        right_answers: [1],
        current_selection: [] //当前选择状态
    },
    {
        title:'AED自动体外除颤器是专门配备给三甲医院医生使用的',
        topic_option:[ //
           {
            name:'对',
            status:''
           },
           {
            name:'错',
            status:''
           },
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 5,//分数
        answer_state: '', //回答状态 1已回答，0未回答
        right_answers: [1],
        current_selection: [] //当前选择状态
    },
    {
        title:'作为应急救援志愿者，看到老爷爷摔倒无法起身，应该怎么做？',
        topic_option:[ //选项
           {
            name:'A：作为一名经专业培训志愿者，应立刻实施帮助，再按专业培训应急救援知识进行救援',
            status:''
           },
           {
            name:'B：看情况再说，担心被讹',
            status:''
           },
        ],
        type: 1,//是否是多选 单选1 多选2
        grade: 25,//分数
        answer_state: '', //回答状态 1正确，0未回答
        right_answers: [0], 
        current_selection: [] //当前选择状态
    },
]


export default topicArr