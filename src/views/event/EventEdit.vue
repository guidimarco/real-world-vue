<script>
export default {
    props: {
        event: {
            required: true
        }
    },
    data: () => {
        return {
            unsavedChanges: false
        }
    },
    beforeRouteLeave(routeTo, routeFrom, next) {
        if (this.unsavedChanges) {
            const answer = window.confirm(
                'Do you really ... ?'
            )
            if (!answer)
                return next(false)
            return next()
        }
        return next()
    }
}
</script>

<template>
    <p>Edit for events here</p>
</template>