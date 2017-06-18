/* eslint-disable no-unused-vars */
const [
  WEEK_SUN,
  WEEK_MON,
  WEEK_TUE,
  WEEK_WED,
  WEEK_THU,
  WEEK_FRI,
  WEEK_SAT
] = [
  7,                            // 现在按国内用户的使用习惯来，周日是最后一天
  1,
  2,
  3,
  4,
  5,
  6
]
/* eslint-disable no-unused-vars */

const NOW = new Date()
const NOW_DAY = NOW.getDay() === 0 ? 7 : NOW.getDay()
const NOW_DATE = NOW.getDate()
const NOW_MONTH = NOW.getMonth() + 1
const NOW_YEAR = NOW.getFullYear()
const TODAY = new Date(`${NOW_YEAR}-${NOW_MONTH}-${NOW_DATE}`)
const WEEKLY_REVIEW_DAY = new Date(`${NOW_YEAR}-${NOW_MONTH}-${NOW_DATE + (WEEK_FRI - NOW_DAY)}`)
const MONTHLY_REVIEW_DAY = new Date(`${NOW_YEAR}-${NOW_MONTH}-01`)
const YEARLY_REVIEW_DAY = new Date(`${NOW_YEAR}-01-01`)
const REVIEW_DEADLINE_DATE = {
  'every day': TODAY,
  'every week': WEEKLY_REVIEW_DAY,
  'every month': MONTHLY_REVIEW_DAY,
  'every year': YEARLY_REVIEW_DAY
}

export function getReviewDeadlineDate () {
  return REVIEW_DEADLINE_DATE
}

export function isProjectNeedReview (project, type) {
  let lastReviewDay = project.logs
      .filter(_ => _.type === `${type} review`)
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || {date: project.createdAt}
  lastReviewDay = new Date(lastReviewDay.date)

  let targetDay = REVIEW_DEADLINE_DATE[type]

  return lastReviewDay < targetDay
}

export default {
  isProjectNeedReview,
  getReviewDeadlineDate,
}
