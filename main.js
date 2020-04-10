const exampleData2 = [
  {
    id: 1,
    active: false,
    title: 'Огляд',
    details: `
      <p class="p-bold">Виконавці: </p>
	  <ol>
		<li>Анна Середа</li>
		<li>Роман Красковський</li>
		<li>Іван Золотарьов</li>
		<li>Дмитрій Сурін</li>
		<li>Максим Жуков</li>
	  </ol>
	  <p class="p-bold">Диспетчер завдань: <a href="https://trello.com/b/l93Mct0Y/frameworks-project-group-7" target="_blank">Trello</a></p>
	  <p class="p-bold">Терміни виконання: <i>04.04.20 - 25.05.20</i></p>
    `
  },
  {
    id: 2,
    active: false,
    title: 'Технічне завдання',
    details: `
      <p class="p-bold">Посилання на файл: <a href="https://drive.google.com/file/d/1tzUPfKofMAK3Z-Uo2TvGZmtYSkfrYd-r/view?usp=sharing" target="_blank">Технічне завдання</a></p>
    `
  },
  {
    id: 3,
    active: false,
    title: `Журнал виконання`,
    details: `
      <p class="p-bold">Посилання на файл: <a href="https://docs.google.com/spreadsheets/d/1JlHu9jRP0qNuncx81jq1YUtsF7X35t85nZevngsRXXU/edit?usp=sharing" target="_blank">Журнал</a></p>
	  <br>
	  <p class="p-bold">Тайм лог: </p>
	  <ol>
		<li><a href="https://docs.google.com/document/d/1gF7t9ye3dSEcZTp8C_PhWkXgTxIeCHKFcDg4-hRs_xw/edit?usp=sharing" target="_blank">Анна Середа</a></li>
		<br>
		<li><a href="https://docs.google.com/document/d/1ko-UhHhYzYNXNgaLhZJIkMtX2UFuKB5Hpulf8ERwDX0/edit?usp=sharing" target="_blank">Роман Красковський</a></li>
		<br>
		<li><a href="https://docs.google.com/document/d/1ldFRv1uxSHWhmb7rjsxcBi8tt7BVO5Es9ZiRH2xFEE0/edit?usp=sharing" target="_blank">Іван Золотарьов</a></li>
		<br>
		<li><a href="https://docs.google.com/document/d/1KvteowLdz2w0LvpbTvC_KT7pE3Zav8N1KhK5epHtFOE/edit?usp=sharing" target="_blank">Дмитрій Сурін</a></li>
		<br>
		<li><a href="https://docs.google.com/document/d/1s_8xcwt9CDMAPgQuC_-dwS2Pj__C7btZe77IxyEcxj0/edit?usp=sharing" target="_blank">Максим Жуков</a></li>
	  </ol>
	  
    `
  },
  {
    id: 4,
    active: false,
    title: 'Доповнення',
    details: `
      <p class="p-bold">Посилання на сайт з дизайном: <a href="https://www.figma.com/file/IdWIVvVL51flhApBXigmCf/scores?node-id=0%3A1" target="_blank">Дизайн</a></p>
	  <p class="p-bold">Реалізація проекту: <a href="https://github.com/TeamSevenFrameworks/JournalWebPage" target="_blank">Project <—-</a></p>
    `
  }
]

Vue.component('accordion', {
  props: {
    content: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      groupId: null
    }
  },
  template: `
    <dl class="accordion box" role="presentation">
      <accordion-item
        v-for="item in content"
        :multiple="multiple"
        :item="item"
        :groupId="groupId"
        :key="item.id">
      </accordion-item>
    </dl>
  `,
  mounted() {
    this.groupId = this.$el.id
  }
})

Vue.component('accordion-item', {
  props: ['item', 'multiple', 'groupId'],
  template: `
    <div :id="groupId + '-' + item.id" class="accordion-item" :class="{'is-active': item.active}">
      <dt class="accordion-item-title">
        <button @click="toggle" class="accordion-item-trigger">
          <h4 class="accordion-item-title-text">{{item.title}}</h4>
          <span class="accordion-item-trigger-icon"></span>
        </button>
      </dt>
      <transition
        name="accordion-item"
        @enter="startTransition"
        @after-enter="endTransition"
        @before-leave="startTransition"
        @after-leave="endTransition">
        <dd v-if="item.active" class="accordion-item-details">
          <div v-html="item.details" class="accordion-item-details-inner"></div>
        </dd>
      </transition>
    </div>
  `,
  methods: {
    toggle(event) {
      if (this.multiple) this.item.active = !this.item.active
      else {
        this.$parent.$children.forEach((item, index) => {
          if (item.$el.id === event.currentTarget.parentElement.parentElement.id) item.item.active = !item.item.active
          else item.item.active = false
        }) 
      }
    },
    
    startTransition(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    
    endTransition(el) {
      el.style.height = ''
    }
  }
})

new Vue({
  el: '#app',
  data: {
    example2: exampleData2
  }
})