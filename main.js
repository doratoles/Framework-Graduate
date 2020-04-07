const exampleData2 = [
  {
    id: 1,
    active: false,
    title: 'Огляд',
    details: `
      <p class="p-bold">Виконавці: </p>
	  <ol>
		<li>Анна Середа</li>
		<li>Роман Красковский</li>
		<li>Иван Золотарьов</li>
		<li>Дмитрий Сурин</li>
		<li>Максим Жуков</li>
	  </ol>
	  <p class="p-bold">Диспетчер завдань: <a href="https://trello.com/b/UCsj7nJN/javaframeworkteam7" target="_blank">Trello</a></p>
	  <p class="p-bold">Терміни виконання: <i>04.04.20 - 25.05.20</i></p>
    `
  },
  {
    id: 2,
    active: false,
    title: 'Технічне завдання',
    details: `
      <p class="p-bold">Посилання на файл: <a href="https://docs.google.com/document/d/14x0qPr7PpJxVVyDLrnZxwDs4vOTeSyg0_eZweBfnuQk/edit" target="_blank">Технічне завдання</a></p>
    `
  },
  {
    id: 3,
    active: false,
    title: `Журнал виконання`,
    details: `
      <p class="p-bold">Посилання на файл: <a href="https://docs.google.com/spreadsheets/d/1mI7fIoVW4ivUDnq9VQNh0blKfO3UnO_pDFRvoyON9X0/edit#gid=1071929941" target="_blank">Журнал</a></p>
    `
  },
  {
    id: 4,
    active: false,
    title: 'Доповнення',
    details: `
      <p class="p-bold">Посилання на сайт з дизайном: <a href="https://www.figma.com/file/IdWIVvVL51flhApBXigmCf/scores?node-id=0%3A1" target="_blank">Дизайн</a></p>
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