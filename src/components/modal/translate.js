const TRANS_MAPPING = {
  "A user with this email address has already been registered": "该邮箱已经注册",
  "Email not confirmed": "账号不存在或密码错误",
  "No user found with this email": "账号不存在或密码错误"
};

export default function translate(error_description) {
  return TRANS_MAPPING[error_description] || error_description;
}
