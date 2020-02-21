<template>
    <div id="new-reply-left">
      <br>
      <h4 class="reply-title">最新回复</h4>
      <div class="reply-all-read" th:if="${session.countUnread != 0}">
        <a class="btn btn-primary btn-xs reply-all-read-btn" href="/clear" role="button">全部已读</a>
      </div>
      <hr class="reply-hr-top">
      <div class="media index-content" th:each="notification:${notifications}">
        <span th:text="${notification.notifierName}"> </span>
        <span th:text="${notification.notificationTypeName}"> </span>
        <a th:href="@{'/notify/' + ${notification.id}}"
        <span th:text="${notification.notifyTitle}"></span></a>
        <span class="label label-danger index-font-size"
              th:text="${notification.notificationStatusName}"></span>
      </div>
      <nav class="nav-right" aria-label="Page navigation">
        <ul class="pagination pagination-md">
          <li th:if="${pageInfo.pageNum} &gt; 5" aria-label="Previous">
            <a th:href="@{/question/publish/(pageNum=1)}" + aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li th:if="${pageInfo.hasPreviousPage}">
            <a th:href="@{/question/publish/(pageNum=${pageInfo.getPrePage()})}">
              <span aria-hidden="true">&lsaquo;</span>
            </a>
          </li>
          <li th:each="pageNum:${pageInfo.navigatepageNums}"
              th:class="${pageInfo.pageNum == pageNum}? 'active' : ''">
            <a th:href="@{/question/publish/(pageNum=
			${pageNum})}" th:text="${pageNum}">
            </a>
          </li>
          <li th:if="${pageInfo.hasNextPage}">
            <a th:href="@{/question/publish/(pageNum=
			${pageInfo.getNextPage()})}">
              <span aria-hidden="true">&rsaquo;</span>
            </a>
          </li>
          <li th:if="${pageInfo.pageNum < pageInfo.pages}" aria-label="Next">
            <a th:href="@{/question/publish/(pageNum=
			${pageInfo.total})}" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
    export default {
        name: "NewReplyLeft"
    }
</script>

<style scoped>

</style>
