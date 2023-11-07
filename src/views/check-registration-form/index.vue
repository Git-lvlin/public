<template>
    <div class="earlyScreening" style="overflow: {{showPopup?'hidden':'scroll'}}" catchtouchmove="{{showPopup?'touchMove':''}}">
    <div class="headFixation">早筛码：{{signCode}}</div>
    <div class="earlyTitle">健康问卷+知情同意书</div>
    <div class="earlyHint">电子版和纸质版的健康问卷书、知情同意书必须真实且一致；如信息有误，造成一切结果和责任，由本人承担。</div>
    <div class="form">
        <div class="form_item">
        <div>1.姓名（请与本人身份证姓名一致，否则造成的法律纠纷由本人承担）<div class="required">*</div></div>
        <van-field  custom-style="background-color: #EEF4FB;"  required bind:input="checkName" model:value="{{ name }}" placeholder="请输入2-12个汉字" error-message="{{nameError}}" input-align="bottom"/>
        </div>

        
        <div class="form_item marck">
        <div>2、身份证号（中国大陆）<div class="required"> *</div></div>
        <van-field 
        custom-style="background-color: #F6EEF1;  margin-bottom: 20rpx;" 
        required 
        model:value="{{ cardNo }}" 
        placeholder="请输入18位数字" 
        bind:input="checkCardNo"
        error-message="{{cardNoError}}"
        maxlength="{{18}}"
        />
        </div>

        <div class="form_item">
        <div>3、性别 <div class="required"> *</div></div>
            <van-radio-group direction="horizontal"  disabled style="margin: 50rpx;" value="{{ sender }}" bind:change="onChangeRadio">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
            </van-radio-group>
        </div>

        <div class="form_item  marck">
        <div>4、年龄（请选择 18-75 适用年龄区间内的周岁数）<div class="required">*</div></div>
        <div style="margin: 40rpx; display: flex;align-items: center;">{{age}}</div>
        <!-- <van-popup show="{{ genderShow }}" position="bottom">
            <van-picker show-toolbar bind:cancel="genderShowClose" columns="{{ columns }}" bind:confirm="genderConfirm" />
        </van-popup> -->
        </div>

        <div class="form_item">
        <div>5、身高 <div class="required">*</div></div>
        <van-field custom-style="background-color: #EEF4FB;  margin-bottom: 20rpx;" required bind:input="checkHeight"  model:value="{{ height }}" error-message="{{heightError}}"  placeholder="请输入120-220之间的数字" use-button-slot>
            <div  slot="button">cm</div>
        </van-field>
        </div>

        <div class="form_item  marck">
        <div>6、体重 <div class="required">*</div></div>
        <van-field custom-style="background-color: #F6EEF1;  margin-bottom: 20rpx;" required bind:input="checkWeight"  model:value="{{ weight }}" error-message="{{weightError}}"  placeholder="请输入30-150之间的数字">
            <div  slot="button">kg</div>
        </van-field>
        </div>

        <div class="form_item">
        <div>7、手机号（请确保此手机号可联系到您）<div class="required"> *</div></div>
        <van-field maxlength="11" disabled bind:input="checkPhone" custom-style="background-color: #EEF4FB;  margin-bottom: 20rpx;" required model:value="{{ phone }}" placeholder="请输入"  error-message="{{phoneError}}" />
        </div>

        <div class="form_item marck">
        <div>8、每天的吸烟量 <div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ smoke }}" bind:change="onChangeSmoke">
            <van-radio name="不吸烟">不吸烟</van-radio>
            <van-radio name="半包以下">半包以下</van-radio>
            <van-radio name="半包到1包">半包到1包</van-radio>
            <van-radio name="1-2包">1-2包</van-radio>
            <van-radio name="2包以上">2包以上</van-radio>
        </van-radio-group>
        </div>

        <div class="form_item">
        <div>9、每周不吃早饭的频率 <div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx;" value="{{ breakfast }}" bind:change="onChangeBreakfast">
            <van-radio name="0次">0次</van-radio>
            <van-radio name="1-2次">1-2次</van-radio>
            <van-radio name="3次及以上">3次及以上</van-radio>
        </van-radio-group>
        </div>

        <div class="form_item marck">
        <div>10、每周吃夜宵的频率 <div class="required"> *</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ midnight }}" bind:change="onChangeMidnight">
            <van-radio name="0次">0次</van-radio>
            <van-radio name="1-2次">1-2次</van-radio>
            <van-radio name="3次及以上">3次及以上</van-radio>
        </van-radio-group>
        </div>

        <div class="form_item">
        <div>11、平常运动的频率是？ <div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ exercise }}" bind:change="onChangeExercise">
            <van-radio name="一周三次及以上">一周三次及以上</van-radio>
            <van-radio name="一周一至两次">一周一至两次</van-radio>
            <van-radio name="从不">从不</van-radio>
        </van-radio-group>
        </div>

        <div class="form_item marck">
        <div>12、本人是否有癌症家族史？ <div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ family }}" bind:change="onChangeFamily">
            <van-radio name="无">无</van-radio>
            <van-radio name="有">有，请详述</van-radio>
            <van-field wx:if="{{ family== '有'?true:false }}" required type="textarea" autosize custom-style="background-color: #F6EEF1;  margin-bottom: 20rpx;"  model:value="{{ familyHistory }}" placeholder="______________________________________________" />
        </van-radio-group>
        </div>

        <div class="form_item">
        <div>13、是否长期感觉精神压力大？ <div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ spirit }}" bind:change="onChangeSpirit">
            <van-radio name="是">是</van-radio>
            <van-radio name="否">否</van-radio>
        </van-radio-group>
        </div>

        <div class="form_item marck">
        <div>14、近一个月内是否服用过药物？ <div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ medicine }}" bind:change="onChangeMedicine">
            <van-radio name="否">否</van-radio>
            <van-radio name="是">是，请详述</van-radio>
            <van-field wx:if="{{ medicine== '是'?true:false }}" required type="textarea" autosize custom-style="background-color: #F6EEF1;  margin-bottom: 20rpx;"  model:value="{{ expand }}" placeholder="______________________________________________" />
        </van-radio-group>
        </div>

        <div class="form_item">
        <div>15、您的排便情况？ <div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ defecate }}" bind:change="onChangeDefecate">
            <van-radio name="每周1-2次腹泻">每周1-2次腹泻</van-radio>
            <van-radio name="每周腹泻3次及以上">每周腹泻3次及以上</van-radio>
            <van-radio name="每周1-2次便秘">每周1-2次便秘</van-radio>
            <van-radio name="每周便秘3次及以上">每周便秘3次及以上</van-radio>
            <van-radio name="排便规律">排便规律</van-radio>
        </van-radio-group>
        </div>

        <div class="form_item marck">
        <div>16、是否携带肝炎病毒（HBV、HCV）？ <div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ hepatitis }}" bind:change="onChangeHepatitis">
            <van-radio name="是">是</van-radio>
            <van-radio name="否">否</van-radio>
            <van-radio name="未检查">未检查</van-radio>
        </van-radio-group>
        </div>

        <div class="form_item">
        <div>17、是否携带艾滋病毒（HIV）？ <div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ virus }}" bind:change="onChangeVirus">
            <van-radio name="是">是</van-radio>
            <van-radio name="否">否</van-radio>
            <van-radio name="未检查">未检查</van-radio>
        </van-radio-group>
        </div>

        <div class="form_item marck">
        <div>18、是否携带HPV（人乳头瘤病毒）病毒？<div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ humanPapilloma }}" bind:change="onChangeHumanPapilloma">
            <van-radio name="是">是</van-radio>
            <van-radio name="否">否</van-radio>
            <van-radio name="未检查">未检查</van-radio>
        </van-radio-group>
        </div>

        <div class="form_item">
        <div>19、最近是否做过肠镜？<div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ colonoscopy }}" bind:change="onChangeColonoscopy" >
            <van-radio name="否">否</van-radio>
            <van-radio name="是" bindtap="polypShow">是，检查时间是：{{tools.timestampToTime(currentDate)}} <image class="arrows" src="{{tools.getImgUrl('miniprogram/common/back_gray@2x.png')}}" /></van-radio>
            </van-radio-group>
            <div wx:if="{{ colonoscopy== '是'?true:false }}">
                <div>检查结果：</div>
                <van-radio-group style="margin: 50rpx;" value="{{ polyp }}" bind:change="onChangePolyp">
                <van-radio name="正常">正常</van-radio>
                <van-radio name="息肉">息肉</van-radio>
                <van-radio name="肿瘤">肿瘤</van-radio>
                </van-radio-group>
            </div>
            <van-popup show="{{ polypShow }}" position="bottom">
                <van-datetime-picker
                    type="date"
                    value="{{ currentDate }}"
                    bind:cancel="polypShowClose" 
                    bind:confirm="polypConfirm"
                />
            </van-popup>
        </div>

        <div class="form_item marck">
        <div>20、最近是否做过胃镜？<div class="required">*</div></div>
            <van-radio-group style="margin: 50rpx;" value="{{ gastroscope }}" bind:change="onChangeGastroscope" >
            <van-radio name="否">否</van-radio>
            <van-radio name="是" bindtap="stomachShow">是，检查时间是：{{tools.timestampToTime(timeDate)}} <image class="arrows" src="{{tools.getImgUrl('miniprogram/common/back_gray@2x.png')}}" /></van-radio>
            </van-radio-group>
            <div wx:if="{{ gastroscope== '是'?true:false }}">
                <div>检查结果：</div>
                <van-radio-group style="margin: 50rpx;" value="{{ stomach }}" bind:change="onChangeStomach">
                <van-radio name="正常">正常</van-radio>
                <van-radio name="息肉">息肉</van-radio>
                <van-radio name="肿瘤">肿瘤</van-radio>
                </van-radio-group>
            </div>
            <van-popup show="{{ stomachShow }}" position="bottom">
                <van-datetime-picker
                    type="date"
                    value="{{ timeDate }}"
                    bind:cancel="stomachShowClose" 
                    bind:confirm="stomachConfirm"
                />
            </van-popup>
        </div>

        <div class="form_item">
        <div>21、近半年内，是否针对某一种（或某几种）癌症进行过肿瘤标志物检测？<div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx 0 0 50rpx;" value="{{ landmark }}" bind:change="onChangeLandmark" >
            <van-radio name="未检测">未检测</van-radio>
            <van-radio name="已检测">
            已检测，结果：
            <van-radio-group wx:if="{{ landmark == '已检测' }}"  style="display: inline-block;" direction="horizontal"  value="{{ lung }}" bind:change="onChangeLung" >
                <van-radio name="正常">正常</van-radio>
                <van-radio name="有异常">有异常</van-radio>
            </van-radio-group>
            </van-radio>
        </van-radio-group>
        <div wx:if="{{ lung == '有异常'&&landmark == '已检测' }}">
            <div>异常项目为：</div>
            <van-checkbox-group style="margin: 50rpx;" value="{{ various }}" bind:change="onChangeVarious">
                <van-checkbox shape="square" name="胃癌">胃癌</van-checkbox>
                <van-checkbox shape="square" name="肝癌">肝癌</van-checkbox>
                <van-checkbox shape="square" name="肠癌">肠癌</van-checkbox>
                <van-checkbox shape="square" name="胰腺癌">胰腺癌</van-checkbox>
                <van-checkbox shape="square" name="卵巢癌">卵巢癌</van-checkbox>
                <van-checkbox shape="square" name="前列腺癌">前列腺癌</van-checkbox>
                <van-checkbox shape="square" name="甲状腺癌">甲状腺癌</van-checkbox>
                <van-checkbox shape="square" name="食管癌">食管癌</van-checkbox>
            </van-checkbox-group>
        </div>
        
        </div>

        <div class="form_item marck">
        <div>22、近1年是否做过肺部低剂量螺旋CT（LDCT）检查？<div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx 0 0 50rpx;" value="{{ ldct }}" bind:change="onChangeLdct" >
            <van-radio name="未检测">未检测</van-radio>
            <van-radio name="已检测">
            已检测，结果：
            <van-radio-group wx:if="{{ ldct == '已检测'  }}" style="display: inline-block;" direction="horizontal"  value="{{ spiral }}" bind:change="onChangeSpiral" >
                <van-radio name="正常">正常</van-radio>
                <van-radio name="有异常">有异常</van-radio>
            </van-radio-group>
            </van-radio>
        </van-radio-group>
        <div wx:if="{{ spiral == '有异常'&&ldct == '已检测'  }}">
            <div>异常为：</div>
            <van-field required type="textarea" autosize  custom-style="background-color: #F6EEF1;  margin-bottom: 20rpx;"  model:value="{{ drugCause }}" placeholder="______________________________________________" />
        </div>
        </div>

        <div class="form_item">
        <div>23、近1年是否做过乳腺超声或钼靶检查（男性选未检测）？<div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx 0 0 50rpx;" value="{{ breast }}" bind:change="onChangeBreast" >
            <van-radio name="未检测">未检测</van-radio>
            <van-radio name="已检测">
            已检测，结果：
            <van-radio-group wx:if="{{ breast == '已检测'  }}" style="display: inline-block;" direction="horizontal"  value="{{ ultrasound }}" bind:change="onChangeUltrasound" >
                <van-radio name="正常">正常</van-radio>
                <van-radio name="有异常">有异常</van-radio>
            </van-radio-group>
            </van-radio>
        </van-radio-group>
        <div wx:if="{{ ultrasound == '有异常'&&breast == '已检测'  }}">
            <div>异常为：</div>
            <van-field required type="textarea" autosize custom-style="background-color: #EEF4FB;  margin-bottom: 20rpx;"  model:value="{{ tungsten }}" placeholder="______________________________________________" />
        </div>
        </div>

        <div class="form_item marck">
        <div>24、近1年是否做过肝脏超声检查？<div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx 0 0 50rpx;" value="{{ liver }}" bind:change="onChangeLiver" >
            <van-radio name="未检测">未检测</van-radio>
            <van-radio name="已检测">
            已检测，结果：
            <van-radio-group  wx:if="{{ liver == '已检测'  }}" style="display: inline-block;" direction="horizontal"  value="{{ dirty }}" bind:change="onChangeDirty" >
                <van-radio name="正常">正常</van-radio>
                <van-radio name="有异常">有异常</van-radio>
            </van-radio-group>
            </van-radio>
        </van-radio-group>
        <div wx:if="{{ dirty == '有异常'&&liver == '已检测'  }}">
            <div>异常为：</div>
            <van-field required type="textarea" autosize custom-style="background-color: #F6EEF1;  margin-bottom: 20rpx;"  model:value="{{ exceed }}" placeholder="______________________________________________" />
        </div>
        </div>

        <div class="form_item">
        <div>25、近1年是否做过前列腺核磁共振检查（女性选未检测）？<div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx 0 0 50rpx;" value="{{ prostate }}" bind:change="onChangeProstate" >
            <van-radio name="未检测">未检测</van-radio>
            <van-radio name="已检测">
            已检测，结果：
            <van-radio-group wx:if="{{ prostate == '已检测'  }}" style="display: inline-block;" direction="horizontal"  value="{{ nuclear }}" bind:change="onChangeNuclear" >
                <van-radio name="正常">正常</van-radio>
                <van-radio name="有异常">有异常</van-radio>
            </van-radio-group>
            </van-radio>
        </van-radio-group>
        <div wx:if="{{ nuclear == '有异常'&&prostate == '已检测'  }}">
            <div>异常为：</div>
            <van-field required type="textarea" autosize custom-style="background-color: #EEF4FB;  margin-bottom: 20rpx;"  model:value="{{ resonance }}" placeholder="______________________________________________" />
        </div>  
        </div>

        <div class="form_item marck">
        <div>26、近1年是否做过胰腺超声检查？<div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx 0 0 50rpx;" value="{{ pancreas }}" bind:change="onChangePancreas" >
            <van-radio name="未检测">未检测</van-radio>
            <van-radio name="已检测">
            已检测，结果：
            <van-radio-group wx:if="{{ pancreas == '已检测'  }}" style="display: inline-block;" direction="horizontal"  value="{{ insulin }}" bind:change="onChangeInsulin" >
                <van-radio name="正常">正常</van-radio>
                <van-radio name="有异常">有异常</van-radio>
            </van-radio-group>
            </van-radio>
        </van-radio-group>
        <div wx:if="{{ insulin == '有异常'&&pancreas == '已检测'  }}">
            <div>异常为：</div>
            <van-field required type="textarea" autosize custom-style="background-color: #F6EEF1;  margin-bottom: 20rpx;"  model:value="{{ gland }}" placeholder="______________________________________________" />
        </div>
        
        </div>

        <div class="form_item">
        <div>27、近1年是否做过血常规检查？<div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx 0 0 50rpx;" value="{{ blood }}" bind:change="onChangeBlood" >
            <van-radio name="未检测">未检测</van-radio>
            <van-radio name="已检测">
            已检测，结果：
            <van-radio-group wx:if="{{ blood == '已检测'  }}" style="display: inline-block;" direction="horizontal"  value="{{ routine }}" bind:change="onChangeRoutine" >
                <van-radio name="正常">正常</van-radio>
                <van-radio name="有异常">有异常</van-radio>
            </van-radio-group>
            </van-radio>
        </van-radio-group>
        <div wx:if="{{ routine == '有异常'&&blood == '已检测'  }}">
            <div>异常为：</div>
            <van-field required type="textarea" autosize custom-style="background-color: #EEF4FB;  margin-bottom: 20rpx;"  model:value="{{ examination }}" placeholder="______________________________________________" />
        </div>
        </div>

        <div class="form_item marck">
        <div>28、近1年是否做过卵巢核磁共振检查（男性选未检测）？<div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx 0 0 50rpx;" value="{{ ovary }}" bind:change="onChangeOvary" >
            <van-radio name="未检测">未检测</van-radio>
            <van-radio name="已检测">
            已检测，结果：
            <van-radio-group wx:if="{{ ovary == '已检测'  }}" style="display: inline-block;" direction="horizontal"  value="{{ oophoron }}" bind:change="onChangeOophoron" >
                <van-radio name="正常">正常</van-radio>
                <van-radio name="有异常">有异常</van-radio>
            </van-radio-group>
            </van-radio>
        </van-radio-group>
        <div wx:if="{{ oophoron == '有异常'&&ovary == '已检测'  }}">
            <div>异常为：</div>
            <van-field required type="textarea" autosize custom-style="background-color: #F6EEF1;  margin-bottom: 20rpx;"  model:value="{{ ootheca }}" placeholder="______________________________________________" />
        </div>
        </div>

        <div class="form_item">
        <div>29、近1年是否做甲状腺超声检查？<div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx 0 0 50rpx;" value="{{ thyroid }}" bind:change="onChangeThyroid" >
            <van-radio name="未检测">未检测</van-radio>
            <van-radio name="已检测">
            已检测，结果：
            <van-radio-group wx:if="{{ thyroid == '已检测'  }}" style="display: inline-block;" direction="horizontal"  value="{{ thyroidea }}" bind:change="onChangeThyroidea" >
                <van-radio name="正常">正常</van-radio>
                <van-radio name="有异常">有异常</van-radio>
            </van-radio-group>
            </van-radio>
        </van-radio-group>
        <div wx:if="{{ thyroidea == '有异常'&&thyroid == '已检测'  }}">
            <div>异常为：</div>
            <van-field required type="textarea" autosize custom-style="background-color: #EEF4FB;  margin-bottom: 20rpx;"  model:value="{{ glandula }}" placeholder="______________________________________________" />
        </div>
        </div>

        <div class="form_item marck">
        <div>30、近1年是否做头颅核磁共振检查？<div class="required">*</div></div>
        <van-radio-group style="margin: 50rpx 0 0 50rpx;" value="{{ skull }}" bind:change="onChangeSkull" >
            <van-radio name="未检测">未检测</van-radio>
            <van-radio name="已检测">
            已检测，结果：
            <van-radio-group wx:if="{{ skull == '已检测'  }}" style="display: inline-block;" direction="horizontal"  value="{{ vertex }}" bind:change="onChangeVertex" >
                <van-radio name="正常">正常</van-radio>
                <van-radio name="有异常">有异常</van-radio>
            </van-radio-group>
            </van-radio>
        </van-radio-group>
        <div wx:if="{{ vertex == '有异常'&&skull == '已检测'  }}">
            <div>异常为：</div>
            <van-field required type="textarea" autosize custom-style="background-color: #F6EEF1;  margin-bottom: 20rpx;"  model:value="{{ scalp }}" placeholder="______________________________________________" />
        </div>
        </div>


        <div class="form_item">
        <div class="informed_consent">知情同意书 <div class="required">*</div></div>
        <div class="informed_consent_deatil">
            1、本产品是基于代谢组学成果对人体内肿瘤代谢微环境进行综合评估的前沿检测技术，通过抽血为检测者提供肿瘤早期风险筛查预警，及早发现隐患，更有针对性地辅助推进癌症的早筛早诊早治。 
        </div>
        <div class="informed_consent_deatil">
            2、适用于本产品的检测者为 18至75 周岁的普通人群。18至75 周岁年龄段之外的人群、有肿瘤病史、有肿瘤治疗史、肿瘤相关药物服用史的人群，为不适用人群。如检测者属不适用人群，但仍坚持要求实施筛查检测，则最终的筛查结果报告仅作为参考，检测方对该检测者不承担任何相关责任。 
        </div>
        <div class="informed_consent_deatil">
            3、任何筛查或临床诊查手段，即便经过严格的检验检查程序，仍可能出现不可控误差。本次筛查中相关检测方将确保检测程序的严谨性，筛查结果报告只对该检测者的本次样本负责，检测者应对检测个体与样本的一致性负责。 
        </div>
        <div class="informed_consent_deatil">
            4、筛查结果报告内的各种风险分析是基于机器学习模型做出的，其风险预警仅限于提示检测者存在肿瘤或相关代谢异常的可能性。 
        </div>
        <div class="informed_consent_deatil">
            5、大多数肿瘤的发生是由多种遗传因素、代谢微环境水平和环境因素共同作用的结果。若检测者的筛查结果报告中提示有异常，建议去往正规医院或医疗机构专科进一步诊查。 
        </div>
        <div class="informed_consent_deatil">
            6、检测者个人信息、样本信息及筛查结果报告等，将被严格保管和保密，不会透露给任何无关第三方。
        </div>
        </div>
        <div class="statement">
        <div class="statement_declaration">声明 <div class="required">*</div></div>
        <div class="statement_declaration_detail">1）如您在本平台“中科泰康高科技产业（广州）有限公司“购买 了“泛肿瘤风险筛查项目 ” （ 14项肿瘤的代谢组学泛癌风险筛查），请在下单前与您的分享服务人员进行采血预约（采血前，请务必确保您是在合法合规的医疗机构、并由具备专业资质的医护人员进行操作。如果您发现有任何不符合规定的情况，有权向平台反映或投诉）</div>
        <div class="statement_declaration_detail"> 2）“本健康调查问卷”及“知情同意书”仅做日常健康行为参考，将递交一份给成都泰莱高仁医学检验实验室有限公司检测并出具检测报告，在未得到您本人许可，不会透露给无关方，亦不会用到任何商业用途。本公司保留对问卷及报告的说明、解释和更新的权利。</div>
        <div class="statement_declaration_detail">3）本人（受检人或其监护人）已阅读知情同意书且对条款理解清楚，同意进行上述的肿瘤的代谢组学泛癌风险筛查，且承诺提供的所有问卷信息准确属实。 如因本人代签或签署信息不准确，造成的一切法律纠纷问题由签署人全责承担。</div>
        <div class="statement_declaration_detail">4）特别说明：早筛下单人员分享电子早筛码给受检人签署健康问卷书与知情同意书，一个早筛码只能一个人签署，只能签署一次，不能修改。线上填写资料与线下纸质版健康问卷书与知情同意书填写资料必须真实且一致，如果信息不匹配，将可能收不到检测报告，由此产生的一切法律问题和纠纷，由其本人承担。</div>
        <div class="signature_name" bindtap="onShowPopup">
            <image class="avatarImage" src="{{ signUrl }}" />
            请点击本处签字：__________________
        </div>
        </div>
        <div class="next_step">
            <van-button 
            bind:click="onSubmitter"
            >
            我填完了，提交
            </van-button>
        </div>
        <van-button 
        color="{{signUrl?'#003F6A':'#FCFCFC'}}" 
        custom-style="color: {{signUrl?'#fff':'#E1E1E1'}}; display: flex; margin: 40rpx auto;"  
        type="primary" 
        bind:click="onSubmitter"
        disabled="{{signUrl?false:true}}"
        >
        我填完了，提交
        </van-button>
    </div>
    </div>
</template>
  
  <script>
  import Vue from "vue";
  import { Image as VanImage, Field, RadioGroup, Radio } from "vant";
  import { getImgUrl } from "@/utils/tools";
  import { appBaseUrl, meBaseUrl } from "@/constant/index";
  import { goToApp } from "@/utils/userInfo";
  import teamApi from '@/apis/center';
  Vue.use(VanImage);
  Vue.use(Field);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  export default {
    data() {
      return {
        list: null,
        type: [
          {},
          {},
          '进行中',
          '未开始',
          '已结束',
          '已终止',
        ]
      };
    },
    components: {},
    created() {
      this.getList();
    },
    mounted() {
    },
    methods: {
      getImgUrl,
    },
  };
  </script>
  
<style lang="scss" scoped>
    .earlyScreening {
        overflow: auto;
        background-color: #fff;
    }

    .earlyScreening .required{
        display: inline-block;
        color: red;
    }

    .headFixation{
        width: 410rpx;
        height: 34rpx;
        font-size: 24rpx;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #999999;
        line-height: 68rpx;
        margin: 0 20rpx;
    }

    .earlyTitle{
        text-align: center;
        margin: 50rpx auto;
        margin-top: 50rpx;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #333333;
        font-size: 52rpx;
    }

    .earlyHint{
        font-size: 28rpx;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: bold;
        color: #CD0303;
        line-height: 38rpx;
        text-align: center;
        margin: 20rpx;
    }

    .earlyScreening .form{
    padding-bottom: 40rpx;
    }

    .earlyScreening .form_item{
        background-color: #EEF4FB; 
        margin-bottom: 20rpx;
        padding: 20rpx;
        color: #333333;
        font-size: 30rpx;
        font-weight: 500;
    }

    .earlyScreening .form_item_hint{
        font-size: 24rpx;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #AA2F2F;
    }

    .earlyScreening .marck{
        background-color: #F6EEF1; 
    } 

    .earlyScreening .van-radio{
        margin-bottom: 20rpx;
    }

    .earlyScreening .van-radio__icon {
        background-color: #fff;
    }
    .earlyScreening .van-radio__icon--checked {
        background-color: var(--radio-checked-icon-color,#1989fa);
        border-color: var(--radio-checked-icon-color,#1989fa);
        color: #fff;
    }

    .earlyScreening .van-checkbox  {
        margin-bottom: 15rpx;
    }

    .earlyScreening .van-checkbox__icon {
        background-color: #fff;
    }
    .earlyScreening .van-checkbox__icon--checked {
        background-color: var(--checkbox-checked-icon-color,#1989fa);
        border-color: var(--checkbox-checked-icon-color,#1989fa);
        color: #fff;
    }

    .input_highlight{
        background-color: #EEF4FB; 
        margin-bottom: 20rpx;
    }

    .informed_consent{
        font-size: 36rpx;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: 700;
        color: #333333;
        line-height: 38rpx;
        text-align: center;
    }

    .informed_consent_deatil{
        font-size: 28rpx;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #333333;
        line-height: 42rpx;
        margin-top: 20rpx;
    }

    .statement{
        padding: 20rpx;
        background-color: #F6EEF1; 
        line-height: 42rpx;
        font-weight: 500;
        color: #333333;
        font-size: 30rpx;
    }
    .statement_declaration{
        font-size: 36rpx;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: 700;
        color: #333333;
        line-height: 38rpx;
        text-align: center;
    }

    .statement_declaration_detail{
        font-size: 28rpx;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #333333;
        line-height: 42rpx;
        margin-top: 20rpx;
    }

    .signature_name{
        color: #AA2F2F;
        font-weight: bold;
        margin: 100rpx 0 20rpx 150rpx;
        position: relative;
    }

    .avatarImage{
        width: 150rpx;
        height: 100rpx;
        position: absolute;
        right: 100rpx;
        bottom: 20rpx;
    }

    .earlyScreening .next_step{
    margin: 40rpx auto;
    text-align: center;
    }

    .earlyScreening .next_step button{
        width: 660rpx;
        height: 98rpx;
        background: linear-gradient(95deg, #FF6E53 0%, #FF0000 100%);
        box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(229,53,47,0.4);
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        opacity: 1;
        color: #fff;
    }

    .earlyScreening .arrows{
        color:#838383; 
        display: inline-block;
        font-size: 35rpx; 
        font-weight: bold;
        margin-left: 25rpx;
        width: 30rpx;
        height: 30rpx;
    }

</style>
  