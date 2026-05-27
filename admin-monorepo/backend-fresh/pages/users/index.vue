<template>
    <div class="space-y-6">
        <!-- 헤더 -->
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-bold text-gray-800">사용자 관리</h2>
                <p class="text-gray-500 text-sm mt-1">전체 사용자 목록을 관리하세요.</p>
            </div>
            <button @click="openModal('create')"
                class="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                + 사용자 추가
            </button>
        </div>

        <!-- 검색/필터 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div class="flex gap-3">
                <input v-model="search" type="text" placeholder="이름 또는 이메일로 검색..."
                    class="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400"
                    @input="currentPage = 1" />
                <button @click="search = ''; currentPage = 1"
                    class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg transition-colors">
                    초기화
                </button>
            </div>
        </div>

        <!-- 테이블 -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div v-if="pending" class="p-8 text-center text-gray-400">불러오는 중...</div>

            <table v-else class="w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th class="text-left px-6 py-4 text-gray-500 font-medium">ID</th>
                        <th class="text-left px-6 py-4 text-gray-500 font-medium">이름</th>
                        <th class="text-left px-6 py-4 text-gray-500 font-medium">이메일</th>
                        <th class="text-left px-6 py-4 text-gray-500 font-medium">가입일</th>
                        <th class="text-center px-6 py-4 text-gray-500 font-medium">관리</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 text-gray-400">#{{ user.id }}</td>
                        <td class="px-6 py-4 font-medium text-gray-800">{{ user.name }}</td>
                        <td class="px-6 py-4 text-gray-600">{{ user.email }}</td>
                        <td class="px-6 py-4 text-gray-400">{{ formatDate(user.created_at) }}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center justify-center gap-2">
                                <button @click="openModal('edit', user)"
                                    class="px-3 py-1 text-xs text-indigo-600 hover:bg-indigo-50 border border-indigo-200 rounded-lg transition-colors">
                                    수정
                                </button>
                                <button @click="confirmDelete(user)"
                                    class="px-3 py-1 text-xs text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors">
                                    삭제
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="!filteredUsers.length">
                        <td colspan="5" class="px-6 py-8 text-center text-gray-400">
                            {{ search ? '검색 결과가 없습니다.' : '사용자가 없습니다.' }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 페이지네이션 -->
            <div v-if="totalPages > 1" class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p class="text-sm text-gray-500">
                    전체 {{ filteredUsers.length }}명 중 {{ (currentPage - 1) * perPage + 1 }}-{{ Math.min(currentPage *
                        perPage, filteredUsers.length) }}명
                </p>
                <div class="flex gap-1">
                    <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
                        'w-8 h-8 text-sm rounded-lg transition-colors',
                        currentPage === page
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-500 hover:bg-gray-100'
                    ]">
                        {{ page }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 모달 (추가/수정) -->
        <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
                <h3 class="text-lg font-bold text-gray-800 mb-6">
                    {{ modalMode === 'create' ? '사용자 추가' : '사용자 수정' }}
                </h3>

                <div v-if="errorMsg" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {{ errorMsg }}
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">이름</label>
                        <input v-model="form.name" type="text" placeholder="이름 입력"
                            class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                        <input v-model="form.email" type="email" placeholder="이메일 입력"
                            class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
                    </div>
                    <div v-if="modalMode === 'create'">
                        <label class="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                        <input v-model="form.password" type="password" placeholder="비밀번호 입력 (8자 이상)"
                            class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
                    </div>
                </div>

                <div class="flex gap-3 mt-8">
                    <button @click="closeModal"
                        class="flex-1 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        취소
                    </button>
                    <button @click="submitForm" :disabled="saving"
                        class="flex-1 py-2.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors">
                        {{ saving ? '저장 중...' : (modalMode === 'create' ? '추가' : '수정') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 삭제 확인 모달 -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl">
                <h3 class="text-lg font-bold text-gray-800 mb-2">사용자 삭제</h3>
                <p class="text-gray-500 text-sm mb-6">
                    <span class="font-medium text-gray-700">{{ deleteTarget?.name }}</span> 님을 삭제하시겠어요? 이 작업은 되돌릴 수
                    없습니다.
                </p>
                <div class="flex gap-3">
                    <button @click="showDeleteModal = false"
                        class="flex-1 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        취소
                    </button>
                    <button @click="deleteUser" :disabled="saving"
                        class="flex-1 py-2.5 text-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg transition-colors">
                        {{ saving ? '삭제 중...' : '삭제' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface User {
    id: number
    name: string
    email: string
    created_at: string
}

const config = useRuntimeConfig()
const authStore = useAuthStore()

const { data, pending, refresh } = await useFetch<{ data: User[] }>(
    `${config.public.apiBase}/users`,
    { headers: { Authorization: `Bearer ${authStore.token}` } }
)

const users = computed(() => data.value?.data ?? [])

const search = ref('')
const currentPage = ref(1)
const perPage = 10

const filteredUsers = computed(() =>
    users.value.filter(u =>
        u.name.toLowerCase().includes(search.value.toLowerCase()) ||
        u.email.toLowerCase().includes(search.value.toLowerCase())
    )
)

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage))

const paginatedUsers = computed(() =>
    filteredUsers.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
)

const showModal = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const saving = ref(false)
const errorMsg = ref('')
const editTarget = ref<User | null>(null)

const form = reactive({ name: '', email: '', password: '' })

function openModal(mode: 'create' | 'edit', user?: User) {
    modalMode.value = mode
    errorMsg.value = ''
    if (mode === 'edit' && user) {
        editTarget.value = user
        form.name = user.name
        form.email = user.email
        form.password = ''
    } else {
        editTarget.value = null
        form.name = ''
        form.email = ''
        form.password = ''
    }
    showModal.value = true
}

function closeModal() {
    showModal.value = false
}

async function submitForm() {
    errorMsg.value = ''
    if (!form.name || !form.email) {
        errorMsg.value = '이름과 이메일을 입력해주세요.'
        return
    }
    if (modalMode.value === 'create' && form.password.length < 8) {
        errorMsg.value = '비밀번호는 8자 이상이어야 합니다.'
        return
    }

    saving.value = true
    try {
        const url = modalMode.value === 'create'
            ? `${config.public.apiBase}/users`
            : `${config.public.apiBase}/users/${editTarget.value?.id}`
        const method = modalMode.value === 'create' ? 'POST' : 'PUT'
        const body: any = { name: form.name, email: form.email }
        if (modalMode.value === 'create') body.password = form.password

        await $fetch(url, {
            method,
            headers: { Authorization: `Bearer ${authStore.token}` },
            body,
        })
        await refresh()
        closeModal()
    } catch (e: any) {
        errorMsg.value = e?.data?.message || '저장 중 오류가 발생했습니다.'
    } finally {
        saving.value = false
    }
}

const showDeleteModal = ref(false)
const deleteTarget = ref<User | null>(null)

function confirmDelete(user: User) {
    deleteTarget.value = user
    showDeleteModal.value = true
}

async function deleteUser() {
    if (!deleteTarget.value) return
    saving.value = true
    try {
        await $fetch(`${config.public.apiBase}/users/${deleteTarget.value.id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${authStore.token}` },
        })
        await refresh()
        showDeleteModal.value = false
    } catch (e: any) {
        alert('삭제 중 오류가 발생했습니다.')
    } finally {
        saving.value = false
    }
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('ko-KR')
}
</script>
