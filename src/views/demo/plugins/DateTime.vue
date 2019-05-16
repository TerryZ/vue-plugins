<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <h3>datetime <button type="button" class="btn btn-inverse btn-xs" @click="$router.push({path: '/demo'});">Back to List</button></h3>
            <form class="form-horizontal">
                <div class="row">
                    <div class="col-md-3">
                        <p>默认状态</p>
                        <datetime></datetime>
                    </div>
                    <div class="col-md-3">
                        <p>日期和时间格式</p>
                        <datetime :date-time="true"></datetime>
                    </div>
                    <div class="col-md-3">
                        <p>最小日期</p>
                        <datetime :min-date="'2018-05-30'"></datetime>
                    </div>
                    <div class="col-md-3">
                        <p>最大日期</p>
                        <datetime :max-date="'2018-06-10'"></datetime>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <p>只返回年</p>
                        <datetime :year-only="true" ></datetime>
                    </div>
                    <div class="col-md-3">
                        <p>只返回月</p>
                        <datetime :month-only="true"></datetime>
                    </div>
                    <div class="col-md-3">
                        <p>返回年月</p>
                        <datetime :year-month="true"></datetime>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>