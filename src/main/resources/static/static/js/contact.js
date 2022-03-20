/**
 * Created by ZhangYipeng on 2022/02/03  
 */

var index_page = new Vue({
    el: "#contact",
    data: {

    },

    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },

        buttonNotify() {
            this.$notify({
                title: '系统提示',
                message: '您的反馈已提交给管理员，谢谢！',
                type: 'success',
                position: 'bottom-right'
            });
        },

        open() {
            this.$notify({
                title: '成功',
                message: '这是一条成功的提示消息',
                type: 'success'
            });
        },
    }
});